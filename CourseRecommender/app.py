import pandas as pd
import numpy as np
import json
from typing import Dict, List, Optional, Union, Any
import os
import requests
from dotenv import load_dotenv
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.tree import Tree
from rich import box
import time
from tqdm import tqdm
import openai
import gradio as gr
from huggingface_hub import HfApi, HfFolder

# Load environment variables from .env file
load_dotenv()

class CourseRecommender:
    def __init__(self, dataframe: pd.DataFrame):
        """
        Initialize the course recommender with course data
        """
        self.courses = dataframe.drop(columns=['Unnamed: 1', 'Unnamed: 5'], errors='ignore')
        self._preprocess_data()
        self.console = Console()

        # Initialize OpenAI client
        api_key = os.getenv("OPENAI_API_KEY")
        self.ai_enabled = bool(api_key)
        if self.ai_enabled:
            self.openai_client = openai.OpenAI(api_key=api_key)
        else:
            self.console.print("[yellow]Warning: OpenAI API key not found. AI-enhanced features will be disabled.[/yellow]")

    def _preprocess_data(self):
        """
        Preprocess the course data for better recommendations
        """
        # Convert text columns to lowercase
        text_columns = ['Course Name', 'Description', 'Skills', 'Difficulty Level']
        for col in text_columns:
            if col in self.courses.columns:
                self.courses[col] = self.courses[col].astype(str).str.lower()

        # Handle numeric values
        self.courses['Course Rating'] = pd.to_numeric(self.courses['Course Rating'], errors='coerce').fillna(0)
        self.courses['keyword_match_score'] = 0

        # Add course ID for easy reference
        self.courses['Course ID'] = range(1, len(self.courses) + 1)

    def recommend_courses(self, topic: Optional[str] = None, skill_level: Optional[str] = None,
                          top_n: int = 5, personalized: bool = False, user_goals: Optional[str] = None) -> pd.DataFrame:
        """
        Recommend courses based on topic, skill level, and optional user goals
        """
        filtered_courses = self.courses.copy()

        # Show processing indicator
        with self.console.status("[bold green]Finding the best courses for you...", spinner="dots"):
            time.sleep(1)  # Simulate processing time

            # Filter by topic if provided
            if topic:
                topic = topic.lower()
                # Calculate keyword match score
                filtered_courses['keyword_match_score'] = (
                    filtered_courses['Course Name'].str.contains(topic).astype(int) * 3 +
                    filtered_courses['Description'].str.contains(topic).astype(int) * 2 +
                    filtered_courses['Skills'].str.contains(topic).astype(int)
                )
                filtered_courses = filtered_courses[filtered_courses['keyword_match_score'] > 0]

            # Filter by skill level if provided
            if skill_level:
                skill_level = skill_level.lower()
                difficulty_map = {
                    'beginner': ['beginner', 'intro', 'basic', 'level 1', 'fundamentals'],
                    'intermediate': ['intermediate', 'mid-level', 'level 2', 'advanced beginner'],
                    'advanced': ['advanced', 'expert', 'professional', 'level 3', 'master']
                }
                filtered_courses = filtered_courses[
                    filtered_courses['Difficulty Level'].apply(
                        lambda x: any(diff in str(x) for diff in difficulty_map.get(skill_level, [skill_level]))
                    )
                ]

            # Add AI relevance scoring if enabled
            filtered_courses['ai_relevance_score'] = 0
            if personalized and user_goals and self.ai_enabled:
                for idx, course in filtered_courses.iterrows():
                    relevance_score = self._get_ai_relevance_score(course, topic, user_goals)
                    filtered_courses.at[idx, 'ai_relevance_score'] = relevance_score

            # Calculate final recommendation score
            if not filtered_courses.empty:
                filtered_courses['recommendation_score'] = (
                    filtered_courses['Course Rating'] * 0.4 +
                    filtered_courses['keyword_match_score'] * 0.3 +
                    filtered_courses['ai_relevance_score'] * 0.2 +
                    np.random.rand(len(filtered_courses)) * 0.1
                )
                filtered_courses = filtered_courses.sort_values('recommendation_score', ascending=False)

        return filtered_courses.head(top_n)

    def _get_ai_relevance_score(self, course: pd.Series, topic: str, user_goals: str) -> float:
        """
        Use AI to determine how relevant a course is to user's specific goals
        """
        if not self.ai_enabled:
            return 0.5
            
        try:
            prompt = f"""
            Rate how relevant this course is to a learner with these goals on a scale of 0-10:

            Topic of interest: {topic}
            User's learning goals: {user_goals}

            Course details:
            - Name: {course['Course Name']}
            - Description: {course['Description']}
            - Skills taught: {course['Skills']}
            - Difficulty: {course['Difficulty Level']}

            Return only a number from 0-10.
            """

            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an educational advisor helping match courses to learner goals."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=10,
                temperature=0.3
            )

            try:
                score = float(response.choices[0].message.content.strip())
                return min(max(score, 0), 10) / 10  # Normalize to 0-1 range
            except ValueError:
                return 0.5  # Default value if parsing fails

        except Exception as e:
            self.console.print(f"[red]Error getting AI relevance score: {e}[/red]")
            return 0.5

    def generate_roadmap(self, topic: str, skill_level: Optional[str] = None,
                         user_goals: Optional[str] = None, detailed: bool = False) -> Dict:
        """
        Generate a personalized learning roadmap based on the topic and user goals
        """
        self.console.print(Panel(f"[bold cyan]Generating your personalized learning roadmap for [green]{topic}[/green]...[/bold cyan]"))

        # Display a progress bar for visual effect
        for _ in tqdm(range(5), desc="Processing roadmap data"):
            time.sleep(0.3)

        # Generate roadmap using AI if enabled and requested, otherwise use default
        if detailed and self.ai_enabled and user_goals:
            return self._generate_ai_roadmap(topic, skill_level, user_goals)
        else:
            return self._generate_default_roadmap(topic)

    def _generate_ai_roadmap(self, topic: str, skill_level: str, user_goals: str) -> Dict:
        """
        Use AI to generate a personalized and detailed learning roadmap
        """
        try:
            # Enhanced prompt with specific structure and guidance
            prompt = f"""
            Create a comprehensive learning roadmap for someone wanting to master {topic}.

            Learner information:
            - Current skill level: {skill_level}
            - Learning goals: {user_goals}

            The roadmap should be detailed, actionable, and specifically tailored to the learner's
            skill level and goals. Provide a clear progression path that breaks down the journey 
            into logical stages with specific concepts to learn at each stage.

            Format the response as a JSON object with exactly this structure:
            {{
                "learningPath": [
                    {{
                        "step": "Step name (be specific)",
                        "difficulty": "Beginner/Intermediate/Advanced",
                        "description": "Detailed description of this learning stage (2-3 sentences)",
                        "time_estimate": "Estimated completion time (weeks/months)",
                        "key_concepts": ["Specific concept 1", "Specific concept 2", "Specific concept 3"],
                        "milestones": ["Practical milestone 1", "Practical milestone 2"],
                        "practice_activities": ["Activity 1", "Activity 2"]
                    }},
                    // 3-5 steps total, progressing from fundamentals to mastery
                ],
                "projectSuggestions": [
                    {{
                        "name": "Project name (be specific to {topic})",
                        "description": "Detailed project description (2-3 sentences)",
                        "complexity": "Low/Medium/High",
                        "skills_practiced": ["Skill 1", "Skill 2", "Skill 3"],
                        "resources": ["Specific resource 1", "Specific resource 2"],
                        "estimated_time": "Project completion time estimate"
                    }},
                    // 3-4 projects of increasing complexity
                ],
                "resources": {{
                    "books": ["Specific book title 1", "Specific book title 2", "Specific book title 3"],
                    "online_courses": ["Specific course 1", "Specific course 2"],
                    "communities": ["Specific community 1", "Specific community 2"],
                    "tools": ["Specific tool 1", "Specific tool 2", "Specific tool 3"],
                    "practice_platforms": ["Specific platform 1", "Specific platform 2"]
                }},
                "career_insights": [
                    "Specific insight about {topic} career opportunities",
                    "Skill demand information",
                    "Industry application of {topic} skills"
                ]
            }}

            Ensure all content is specific to {topic} (not generic) and appropriate for a {skill_level} 
            with these goals: {user_goals}. Focus on practical, actionable advice.
            """

            response = self.openai_client.chat.completions.create(
                model="gpt-4o",  # Using more capable model for better roadmaps
                messages=[
                    {"role": "system", "content": "You are an expert educational curriculum designer with deep knowledge across technical and non-technical subjects. You create detailed, actionable learning plans that are practical and tailored to individual needs."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2500,
                temperature=0.5,
                response_format={"type": "json_object"}  # Enforce JSON response
            )

            try:
                roadmap_text = response.choices[0].message.content
                return json.loads(roadmap_text)
            except json.JSONDecodeError as e:
                self.console.print(f"[yellow]Warning: Could not parse AI response as JSON: {e}. Using default roadmap.[/yellow]")
                return self._generate_default_roadmap(topic)

        except Exception as e:
            self.console.print(f"[red]Error generating AI roadmap: {e}[/red]")
            return self._generate_default_roadmap(topic)

    def _generate_default_roadmap(self, topic: str) -> Dict:
        """
        Generate a default roadmap when AI generation fails or is not available
        """
        return {
            "learningPath": [
                {
                    "step": f"Foundations of {topic}",
                    "difficulty": "Beginner",
                    "description": f"Build core knowledge and fundamental skills in {topic}. Focus on understanding basic principles and becoming familiar with essential tools.",
                    "time_estimate": "4-6 weeks",
                    "key_concepts": [f"{topic} basics", "Core principles", "Fundamental tools and techniques"],
                    "milestones": [f"Complete first {topic} exercise", f"Build simple {topic} project"],
                    "practice_activities": [f"Daily {topic} exercises", "Follow beginner tutorials"]
                },
                {
                    "step": f"{topic} Skill Development",
                    "difficulty": "Intermediate",
                    "description": f"Deepen understanding of {topic} and apply more advanced concepts. Focus on building practical skills through hands-on projects and implementation.",
                    "time_estimate": "8-12 weeks",
                    "key_concepts": [f"Advanced {topic} techniques", "Applied projects", "Specialized tools"],
                    "milestones": [f"Complete medium complexity {topic} project", "Solve real-world problems"],
                    "practice_activities": ["Implement sample projects", "Participate in forums/discussions"]
                },
                {
                    "step": f"{topic} Mastery & Specialization",
                    "difficulty": "Advanced",
                    "description": f"Develop expert-level skills in {topic} with focus on real-world application. Specialize in specific areas and build a professional portfolio.",
                    "time_estimate": "12-16 weeks",
                    "key_concepts": ["Industry best practices", "Complex problem-solving", "Portfolio development"],
                    "milestones": ["Create capstone project", "Contribute to community"],
                    "practice_activities": ["Build complex projects", "Mentor beginners"]
                }
            ],
            "projectSuggestions": [
                {
                    "name": f"Beginner Project: {topic} Fundamentals Application",
                    "description": f"Apply basic {topic} concepts in a simple project to practice fundamentals and gain confidence.",
                    "complexity": "Low",
                    "skills_practiced": [f"Basic {topic} principles", "Problem-solving", "Tool familiarity"],
                    "resources": ["Online tutorials", "Documentation", "Starter templates"],
                    "estimated_time": "1-2 weeks"
                },
                {
                    "name": f"Intermediate Project: Interactive {topic} Application",
                    "description": f"Create a more complex application using intermediate {topic} skills with greater functionality and sophistication.",
                    "complexity": "Medium",
                    "skills_practiced": [f"Intermediate {topic} techniques", "Code organization", "Testing"],
                    "resources": ["GitHub repositories", "Online coding platforms", "Community forums"],
                    "estimated_time": "3-4 weeks"
                },
                {
                    "name": f"Capstone Project: Advanced {topic} Implementation",
                    "description": f"Apply all learned skills in a comprehensive {topic} project that showcases mastery and solves a real-world problem.",
                    "complexity": "High",
                    "skills_practiced": [f"Advanced {topic} mastery", "System design", "Optimization"],
                    "resources": ["Industry case studies", "Research papers", "Expert communities"],
                    "estimated_time": "6-8 weeks"
                }
            ],
            "resources": {
                "books": [f"Introduction to {topic}", f"Advanced {topic} Techniques", f"Mastering {topic}"],
                "online_courses": [f"{topic} for Beginners", f"Professional {topic} Masterclass"],
                "communities": ["Stack Overflow", "Reddit", f"{topic} Discord Servers"],
                "tools": [f"{topic} Development Environment", "Version Control", "Testing Frameworks"],
                "practice_platforms": ["Codecademy", "Exercism", "LeetCode"]
            },
            "career_insights": [
                f"Proficiency in {topic} is valuable for roles in software development, data science, and IT operations",
                f"Entry-level {topic} positions typically require demonstrated project experience",
                f"{topic} specialists can pursue careers in consulting, education, or product development"
            ]
        }

    def get_course_details(self, course: pd.Series) -> Dict[str, str]:
        """
        Get detailed course information
        """
        return {
            "name": course.get('Course Name', 'N/A'),
            "difficulty": course.get('Difficulty Level', 'N/A'),
            "rating": str(course.get('Course Rating', 'N/A')),
            "url": course.get('Course URL', '#'),
            "skills": course.get('Skills', 'N/A'),
            "description": course.get('Description', 'No description available'),
            "id": str(course.get('Course ID', '0'))
        }

    def display_roadmap(self, roadmap: Dict):
        """
        Display the learning roadmap in a beautiful format using rich
        """
        self.console.print("\n")
        self.console.print(Panel("[bold cyan]YOUR PERSONALIZED LEARNING JOURNEY[/bold cyan]",
                               box=box.DOUBLE, expand=False))

        # Create a tree for learning path
        learning_tree = Tree("[bold yellow]Learning Path[/bold yellow]")
        for stage in roadmap["learningPath"]:
            stage_node = learning_tree.add(f"[bold green]{stage['step']}[/bold green] ({stage['difficulty']}) - {stage['time_estimate']}")
            stage_node.add(f"[italic]{stage['description']}[/italic]")

            concepts_node = stage_node.add("[bold blue]Key Concepts:[/bold blue]")
            for concept in stage.get("key_concepts", []):
                concepts_node.add(concept)

            if "milestones" in stage:
                milestones_node = stage_node.add("[bold magenta]Milestones:[/bold magenta]")
                for milestone in stage["milestones"]:
                    milestones_node.add(milestone)
                    
            if "practice_activities" in stage:
                activities_node = stage_node.add("[bold cyan]Practice Activities:[/bold cyan]")
                for activity in stage["practice_activities"]:
                    activities_node.add(activity)

        self.console.print(learning_tree)
        self.console.print("\n")

        # Project suggestions table
        project_table = Table(title="Recommended Projects", box=box.ROUNDED)
        project_table.add_column("Project Name", style="cyan", no_wrap=True)
        project_table.add_column("Description", style="white")
        project_table.add_column("Complexity", style="magenta")
        project_table.add_column("Est. Time", style="yellow")

        for project in roadmap["projectSuggestions"]:
            project_table.add_row(
                project["name"],
                project["description"],
                project["complexity"],
                project.get("estimated_time", "N/A")
            )

        self.console.print(project_table)
        self.console.print("\n")

        # Resources panel
        resources = roadmap.get("resources", {})
        resources_text = ""

        resource_categories = {
            "books": "Recommended Books",
            "online_courses": "Online Courses",
            "communities": "Communities",
            "tools": "Essential Tools",
            "practice_platforms": "Practice Platforms"
        }
        
        for category, title in resource_categories.items():
            if category in resources and resources[category]:
                resources_text += f"[bold yellow]{title}:[/bold yellow]\n"
                for item in resources[category]:
                    resources_text += f"• {item}\n"
                resources_text += "\n"

        self.console.print(Panel(resources_text, title="[bold cyan]Learning Resources[/bold cyan]",
                               box=box.ROUNDED, expand=False))
                               
        # Career insights
        if "career_insights" in roadmap and roadmap["career_insights"]:
            career_text = "[bold yellow]Career Insights:[/bold yellow]\n"
            for insight in roadmap["career_insights"]:
                career_text += f"• {insight}\n"
                
            self.console.print(Panel(career_text, title="[bold cyan]Career Opportunities[/bold cyan]",
                               box=box.ROUNDED, expand=False))

    def display_recommended_courses(self, courses: pd.DataFrame):
        """
        Display recommended courses in a beautiful format
        """
        if courses.empty:
            self.console.print("[yellow]No courses match your criteria. Try broader search terms.[/yellow]")
            return

        table = Table(title="Recommended Courses", box=box.ROUNDED)
        table.add_column("ID", style="dim")
        table.add_column("Course Name", style="cyan")
        table.add_column("Rating", style="yellow")
        table.add_column("Difficulty", style="green")

        for _, course in courses.iterrows():
            table.add_row(
                str(course.get('Course ID', 'N/A')),
                course.get('Course Name', 'N/A').title(),
                f"{course.get('Course Rating', 0):.1f} ★",
                course.get('Difficulty Level', 'N/A').title()
            )

        self.console.print(table)
        self.console.print("\n[dim]Use the course ID to get more details about a specific course.[/dim]")
        
    def roadmap_to_markdown(self, roadmap: Dict, topic: str, skill_level: str) -> str:
        """
        Convert a roadmap to markdown format for export or display
        """
        markdown = f"# Personalized Learning Roadmap: {topic.title()}\n\n"
        markdown += f"*Skill Level: {skill_level.title()}*\n\n"
        
        # Learning Path
        markdown += "## Learning Path\n\n"
        for i, stage in enumerate(roadmap["learningPath"]):
            markdown += f"### {i+1}. {stage['step']} ({stage['difficulty']}) - {stage['time_estimate']}\n\n"
            markdown += f"{stage['description']}\n\n"
            
            markdown += "**Key Concepts:**\n"
            for concept in stage.get("key_concepts", []):
                markdown += f"- {concept}\n"
            markdown += "\n"
            
            if "milestones" in stage:
                markdown += "**Milestones:**\n"
                for milestone in stage["milestones"]:
                    markdown += f"- {milestone}\n"
                markdown += "\n"
                
            if "practice_activities" in stage:
                markdown += "**Practice Activities:**\n"
                for activity in stage["practice_activities"]:
                    markdown += f"- {activity}\n"
                markdown += "\n"
        
        # Project Suggestions
        markdown += "## Recommended Projects\n\n"
        for i, project in enumerate(roadmap["projectSuggestions"]):
            markdown += f"### {i+1}. {project['name']} ({project['complexity']})\n\n"
            markdown += f"{project['description']}\n\n"
            
            if "skills_practiced" in project:
                markdown += "**Skills Practiced:**\n"
                for skill in project["skills_practiced"]:
                    markdown += f"- {skill}\n"
                markdown += "\n"
                
            markdown += "**Resources:**\n"
            for resource in project.get("resources", []):
                markdown += f"- {resource}\n"
            markdown += "\n"
            
            if "estimated_time" in project:
                markdown += f"**Estimated Time:** {project['estimated_time']}\n\n"
        
        # Resources
        markdown += "## Learning Resources\n\n"
        resources = roadmap.get("resources", {})
        
        resource_categories = {
            "books": "Recommended Books",
            "online_courses": "Online Courses",
            "communities": "Communities",
            "tools": "Essential Tools",
            "practice_platforms": "Practice Platforms"
        }
        
        for category, title in resource_categories.items():
            if category in resources and resources[category]:
                markdown += f"### {title}\n"
                for item in resources[category]:
                    markdown += f"- {item}\n"
                markdown += "\n"
        
        # Career Insights
        if "career_insights" in roadmap and roadmap["career_insights"]:
            markdown += "## Career Opportunities\n\n"
            for insight in roadmap["career_insights"]:
                markdown += f"- {insight}\n"
                
        return markdown

def load_courses(file_path: str = 'Coursera.csv') -> Optional[CourseRecommender]:
    """
    Load courses from CSV and create a CourseRecommender instance
    """
    console = Console()

    try:
        with console.status("[bold green]Loading course data...", spinner="dots"):
            df = pd.read_csv(file_path)
            time.sleep(1)  # Simulate loading time for visual effect
            console.print(f"[green]Successfully loaded {len(df)} courses![/green]")
        return CourseRecommender(df)
    except FileNotFoundError:
        console.print(f"[red]Error: {file_path} file not found.[/red]")
        return None
    except Exception as e:
        console.print(f"[red]An error occurred while reading the CSV: {e}[/red]")
        return None

def format_courses_as_markdown(recommended_courses: pd.DataFrame) -> str:
    """
    Format course recommendations as markdown - extracted common function
    """
    courses_md = "# Recommended Courses\n\n"
    for i, (_, course) in enumerate(recommended_courses.iterrows()):
        courses_md += f"## {i+1}. {course.get('Course Name', 'N/A').title()}\n\n"
        courses_md += f"**Rating:** {course.get('Course Rating', 0):.1f} ★\n\n"
        courses_md += f"**Difficulty:** {course.get('Difficulty Level', 'N/A').title()}\n\n"
        courses_md += f"**Skills:** {course.get('Skills', 'N/A').title()}\n\n"
        courses_md += f"**Description:**\n{course.get('Description', 'No description available')}\n\n"
        if 'Course URL' in course and course['Course URL'] != '#':
            courses_md += f"[View Course]({course['Course URL']})\n\n"
        courses_md += "---\n\n"
    return courses_md

def main():
    console = Console()

    # Print welcome message
    console.print(Panel.fit(
        "[bold cyan]Course Recommender & Learning Roadmap Generator[/bold cyan]\n"
        "[yellow]Find the perfect courses and create your personalized learning journey[/yellow]",
        box=box.DOUBLE))

    recommender = load_courses()
    if recommender:
        console.print("[bold]Let's find the perfect learning path for you![/bold]\n")

        topic = console.input("[bold green]Enter the topic you want to learn about: [/bold green]")
        skill_level = console.input("[bold green]Enter your skill level (Beginner, Intermediate, Advanced): [/bold green]")

        use_ai = False
        user_goals = None

        if recommender.ai_enabled:
            use_ai = console.input("[bold green]Would you like AI-enhanced personalized recommendations? (y/n): [/bold green]").lower() == 'y'
            if use_ai:
                user_goals = console.input("[bold green]What are your learning goals or career objectives with this topic? [/bold green]")

        # Generate and display roadmap
        roadmap = recommender.generate_roadmap(topic, skill_level, user_goals, detailed=use_ai)
        recommender.display_roadmap(roadmap)
        
        # Option to export roadmap
        export = console.input("\n[bold green]Would you like to export this roadmap to a markdown file? (y/n): [/bold green]").lower() == 'y'
        if export:
            markdown = recommender.roadmap_to_markdown(roadmap, topic, skill_level)
            filename = f"{topic.lower().replace(' ', '_')}_roadmap.md"
            with open(filename, "w") as f:
                f.write(markdown)
            console.print(f"[green]Roadmap exported to {filename}[/green]")

        console.print("\n[bold]Press Enter to see recommended courses...[/bold]")
        input()

        # Get and display recommended courses
        recommended_courses = recommender.recommend_courses(topic, skill_level, personalized=use_ai, user_goals=user_goals)
        recommender.display_recommended_courses(recommended_courses)

        # Allow user to view detailed course info
        while True:
            course_id = console.input("\n[bold green]Enter a course ID for more details (or 'q' to quit): [/bold green]")
            if course_id.lower() == 'q':
                break

            try:
                course_id = int(course_id)
                course = recommended_courses[recommended_courses['Course ID'] == course_id]
                if not course.empty:
                    details = recommender.get_course_details(course.iloc[0])

                    console.print(Panel(
                        f"[bold cyan]{details['name'].title()}[/bold cyan]\n\n"
                        f"[yellow]Rating:[/yellow] {details['rating']} ★\n"
                        f"[yellow]Difficulty:[/yellow] {details['difficulty'].title()}\n\n"
                        f"[yellow]Skills:[/yellow] {details['skills'].title()}\n\n"
                        f"[yellow]Description:[/yellow]\n{details['description']}\n\n"
                        f"[link={details['url']}]View Course[/link]",
                        title="Course Details", box=box.ROUNDED, width=100
                    ))
                else:
                    console.print("[yellow]Course ID not found. Please try again.[/yellow]")
            except ValueError:
                console.print("[yellow]Please enter a valid course ID.[/yellow]")

    console.print(Panel("[bold cyan]Thank you for using the Course Recommender![/bold cyan]", box=box.ROUNDED))

# Gradio interface for Hugging Face deployment
def create_gradio_interface(recommender: CourseRecommender):
    """
    Create a Gradio interface for the course recommender
    """
    def recommend_and_generate(topic, skill_level, goals, use_ai):
        try:
            # Generate roadmap
            roadmap = recommender.generate_roadmap(
                topic=topic, 
                skill_level=skill_level, 
                user_goals=goals if goals else None, 
                detailed=use_ai
            )
            
            # Get course recommendations
            recommended_courses = recommender.recommend_courses(
                topic=topic, 
                skill_level=skill_level, 
                personalized=use_ai, 
                user_goals=goals if goals else None
            )
            
            # Convert roadmap to markdown
            roadmap_md = recommender.roadmap_to_markdown(roadmap, topic, skill_level)
            
            # Format course recommendations as markdown
            courses_md = format_courses_as_markdown(recommended_courses)
            
            return roadmap_md, courses_md
        except Exception as e:
            return f"Error: {str(e)}", "Could not generate course recommendations"
    
    with gr.Blocks(title="Learning Roadmap Generator") as demo:
        gr.Markdown("# 🎓 Learning Roadmap & Course Recommender")
        gr.Markdown("Generate a personalized learning roadmap and course recommendations.")
        
        with gr.Row():
            with gr.Column():
                topic_input = gr.Textbox(label="Topic you want to learn", placeholder="e.g. Python, Data Science, Machine Learning")
                skill_level = gr.Dropdown(
                    ["Beginner", "Intermediate", "Advanced"], 
                    label="Your current skill level"
                )
                goals_input = gr.Textbox(
                    label="Your learning goals (optional)", 
                    placeholder="e.g. Career change, specific project, skill enhancement",
                    lines=3
                )
                use_ai = gr.Checkbox(label="Use AI-enhanced personalization")
                
                generate_btn = gr.Button("Generate Roadmap & Recommendations")
                
            with gr.Column():
                roadmap_output = gr.Markdown(label="Your Personalized Learning Roadmap")
                courses_output = gr.Markdown(label="Recommended Courses")
        
        generate_btn.click(
            recommend_and_generate,
            inputs=[topic_input, skill_level, goals_input, use_ai],
            outputs=[roadmap_output, courses_output]
        )
    
    return demo

if __name__ == "__main__":
    # Check if being run on Hugging Face Spaces
    if os.getenv("SPACE_ID"):
        # Initialize with the CSV file that should be included in the Space
        recommender = load_courses("Coursera.csv")
        if recommender:
            # Deploy as a Gradio app
            app = create_gradio_interface(recommender)
            app.launch()
    else:
        # Run as CLI application
        main()