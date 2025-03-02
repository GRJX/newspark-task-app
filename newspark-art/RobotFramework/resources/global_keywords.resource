*** Settings ***
Library    Browser


*** Variables ***
${BASE_URL}    http://localhost:5173
${ERROR_MESSAGE}    [data-testid="error-message"]


*** Keywords ***
I Should See An Error Message "${message}"
    Wait For Elements State    ${ERROR_MESSAGE}    visible    timeout=3s
    ${error_text}=    Get Text    ${ERROR_MESSAGE}
    Should Be Equal    ${error_text}    ${message}    msg=Expected error message '${message}'

Wait For Navigation
    Wait For Load State    networkidle
    Sleep    0.5s
