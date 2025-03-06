*** Settings ***
Library    Browser
Library    Process
Resource    ../resources/global_keywords.resource
Resource    ../resources/login_keywords.resource


*** Variables ***
${TASKS_PAGE}              /tasks
${NEXT_BUTTON}             [data-testid="next-button"]
${PREVIOUS_BUTTON}         [data-testid="previous-button"]
${CURRENT_PAGE_NUMBER}     [data-testid="current-page-number"]
${TOTAL_PAGES}             [data-testid="total-page-number"]
${TITLE_INPUT}             [data-testid="title-input"]
${EDIT_TITLE_INPUT}        [data-testid="edit-title-input"]
${ADD_TASK_BUTTON}         [data-testid="add-task-button"]
${APPLY_BUTTON}            [data-testid="apply-button"]
${CONFIRM_DELETE_BUTTON}   [data-testid="delete-button"]
${ALERT_MESSAGE}           [data-testid="alert-message"]


*** Keywords ***
I Am On The Tasks Page
    [Documentation]    Navigates to the tasks page
    Go To    ${BASE_URL}${TASKS_PAGE}
    Wait For Load State    networkidle

I Enter "${task_title}" In The Input Field
    [Documentation]    Enters text in the task title input field
    Fill Text    ${TITLE_INPUT}    ${task_title}

I Click The Add Task Button
    [Documentation]    Clicks the add task button
    Click    ${ADD_TASK_BUTTON}
    Wait For Load State    networkidle

I Should See "${task_title}" In The Task List
    [Documentation]    Verifies that a task with the given title is visible in the table
    ${selector}=    Set Variable    table tr:has-text("${task_title}")
    Wait For Elements State    ${selector}    visible    timeout=3s
    Wait For Elements State    ${selector}    message=Task '${task_title}' not found in the task list
    
I Click The Edit Button Next To "${task_title}"
    [Documentation]    Clicks the edit button for a specific task
    ${selector}=    Set Variable    table tr:has-text("${task_title}") >> [data-testid*="edit-task-button"]
    Click    ${selector}
    Wait For Load State    networkidle

I Update The Task Title To "${task_title}"
    [Documentation]    Updates the task title in the edit field
    Fill Text    ${EDIT_TITLE_INPUT}    ${task_title}

I Click The Apply Button
    [Documentation]    Clicks the apply button to save changes
    Click    ${APPLY_BUTTON}
    Wait For Load State    networkidle

I Click The Delete Button Next To "${task_title}"
    [Documentation]    Clicks the delete button for a specific task
    ${selector}=    Set Variable    table tr:has-text("${task_title}") >> [data-testid*="delete-task-button"]
    Click    ${selector}
    Wait For Load State    networkidle

I Confirm The Delete Button
    [Documentation]    Confirms deletion of a task
    Click    ${CONFIRM_DELETE_BUTTON}
    Wait For Load State    networkidle

I Should Not See "${task_title}" In The Task List
    [Documentation]    Verifies that a task with the given title is not visible in the table
    ${selector}=    Set Variable    table tr:has-text("${task_title}")
    Wait For Elements State    ${selector}    detached    timeout=3s
    Wait For Elements State    ${selector}    detached    message=Task '${task_title}' should not be in the task list

I Leave The Input Field Empty
    [Documentation]    Clears the task title input field
    Fill Text    ${TITLE_INPUT}    ${EMPTY}

I Clear The Task Title
    [Documentation]    Clears the edit task title input field
    Fill Text    ${EDIT_TITLE_INPUT}    ${EMPTY}

I Should See An Alert Message "${message}"
    [Documentation]    Verifies that an alert message with the given text is visible
    Wait For Elements State    ${ALERT_MESSAGE}    visible    timeout=3s
    ${text}=    Get Text    ${ALERT_MESSAGE}
    Should Be Equal As Strings    ${text}    ${message}    msg=Expected alert message '${message}'

There Is A Task Named "${task_title}" For "${user}"
    [Documentation]    Creates a task with the given title for the specified user
    I Am Logged In As "${user}"
    I Am On The Tasks Page
    I Enter "${task_title}" In The Input Field
    I Click The Add Task Button

I Navigate To The Tasks Page
    [Documentation]    Navigates directly to the tasks page
    Go To    ${BASE_URL}${TASKS_PAGE}
    Wait For Load State    networkidle

