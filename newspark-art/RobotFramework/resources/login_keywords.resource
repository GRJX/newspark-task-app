*** Settings ***
Library    Browser
Library    Process
Resource    ../resources/global_keywords.resource


*** Variables ***
${LOGIN_PAGE}             /login
${USERNAME_INPUT}         [data-testid="username-input"]
${PASSWORD_INPUT}         [data-testid="password-input"]
${LOGIN_BUTTON}           [data-testid="login-button"]
${LOGOUT_BUTTON}          [data-testid="logout-button"]
${USERNAME_FIELD}         [data-testid="username-input"]
${PASSWORD_FIELD}         [data-testid="password-input"]


*** Keywords ***
I Am On The Login Page
    Go To    ${BASE_URL}${LOGIN_PAGE}
    Wait For Load State    networkidle

I Login As "${user}"
    Fill Text    ${USERNAME_INPUT}    ${user}
    Fill Text    ${PASSWORD_INPUT}    ${user}

I Enter An Incorrect Username Or Password
    Fill Text    ${USERNAME_INPUT}    admin
    Fill Text    ${PASSWORD_INPUT}    wrong123

I Click The Login Button
    Click    ${LOGIN_BUTTON}
    Wait For Load State    networkidle

I Click The Logout Button
    Click    ${LOGOUT_BUTTON}
    Wait For Load State    networkidle

I Should Be Redirected To The "${page_name}" Page
    Wait For Navigation
    ${current_url}=    Get Url
    Should Contain    ${current_url}    ${page_name}    msg=Expected page '${page_name}' in URL

I Should See The Login Form
    Wait For Elements State    ${USERNAME_INPUT}    visible
    Wait For Elements State    ${USERNAME_INPUT}    message=Login form not visible

I Should See A Logout Button
    Wait For Elements State    ${LOGOUT_BUTTON}    visible
    Wait For Elements State    ${LOGOUT_BUTTON}    message=Logout button not visible

I Am Logged In As "${user}"
    I Am On The Login Page
    I Login As "${user}"
    I Click The Login Button
    I Should Be Redirected To The "tasks" Page

I Am Not Logged In
    I Am On The Login Page
    Wait For Elements State    ${USERNAME_INPUT}    visible

I Navigate To The Tasks Page
    Go To    ${BASE_URL}/tasks
    Wait For Load State    networkidle
