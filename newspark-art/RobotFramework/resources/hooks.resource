*** Settings ***
Library    Browser
Library    OperatingSystem
Resource   global_keywords.resource


*** Keywords ***
Before Test
    [Documentation]     Run before each test case
    Start Browser
    Reset Database

After Test
    [Documentation]     Run after each test case
    Close Browser

Start Browser
    [Documentation]     Start a new browser instance.

    New Browser             chromium    headless=${True}
    ${context}              New Context     viewport={'width': 1280, 'height': 720}
    Set Browser Timeout     5s
    New Page                ${BASE_URL}
    Register Keyword To Run On Failure      Take Screenshot                 ${OUTPUT_DIR}/fail-screenshot-{index}           fullPage=True
    
    RETURN                  ${context}

Reset Database
    [Documentation]     Reset the database by copying init_db.json to db.json
    ${project_path}=    Evaluate    os.path.dirname(os.path.dirname(os.path.dirname('${CURDIR}')))    modules=os
    Copy File    ${project_path}/newspark-db/init_db.json    ${project_path}/newspark-db/db.json
