from playwright.sync_api import sync_playwright
from pages.login_page import LoginPage
from pages.tasks_page import TasksPage
import logging
import shutil
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def before_scenario(context, scenario):
    try:
        # Overwrite db.json with init_db.json
        project_path = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        shutil.copyfile(os.path.join(project_path, 'newspark-db', 'init_db.json'), 
                        os.path.join(project_path, 'newspark-db', 'db.json'))
        
        # Initialize Playwright
        context.playwright = sync_playwright().start()
        context.browser = context.playwright.chromium.launch(
            headless=True,
            args=['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
        )
        context.browser_context = context.browser.new_context(
            viewport={'width': 1280, 'height': 720},
            ignore_https_errors=True
        )
        context.page = context.browser_context.new_page()
        context.page.set_default_timeout(5000)
        context.page.set_default_navigation_timeout(5000)
        
        # Initialize page objects
        context.login_page = LoginPage(context.page)
        context.tasks_page = TasksPage(context.page)
        logger.info(f"Setup complete for scenario: {scenario.name}")
    except Exception as e:
        logger.error(f"Failed to initialize browser or page objects: {str(e)}")
        # Cleanup any partially initialized resources
        after_scenario(context, scenario)
        raise

def after_scenario(context, scenario):
    if hasattr(context, 'page'):
        context.page.close()
    if hasattr(context, 'browser_context'):
        context.browser_context.close()
    if hasattr(context, 'browser'):
        context.browser.close()
    if hasattr(context, 'playwright'):
        context.playwright.stop()
