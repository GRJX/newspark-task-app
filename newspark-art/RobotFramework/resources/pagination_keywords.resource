*** Settings ***
Library    Browser
Resource   login_keywords.resource

*** Variables ***
${NEXT_BUTTON}            css=[data-testid="next-button"]
${PREVIOUS_BUTTON}        css=[data-testid="previous-button"]
${CURRENT_PAGE_NUMBER}    css=[data-testid="current-page-number"]
${TOTAL_PAGES}            css=[data-testid="total-page-number"]

*** Keywords ***
There Are Multiple Pages Of Tasks
    Wait For Elements State    ${NEXT_BUTTON}    visible    message=Pagination is visible, multiple pages of tasks
    Wait For Elements State    ${PREVIOUS_BUTTON}    visible    message=Pagination is visible, multiple pages of tasks

There Is Only One Page Of Tasks
    Wait For Elements State    ${NEXT_BUTTON}    detached    message=Pagination not visible, no multiple pages of tasks
    Wait For Elements State    ${PREVIOUS_BUTTON}    detached    message=Pagination not visible, no multiple pages of tasks

I Am On A Page Other Than The First Page
    Click    ${NEXT_BUTTON}
    Wait For Navigation

I Click The Next Button
    Click    ${NEXT_BUTTON}
    Wait For Navigation

I Click The Previous Button
    Click    ${PREVIOUS_BUTTON}
    Wait For Navigation

I Should See The Next Page Of Tasks
    ${current_page}=    Get Text    ${CURRENT_PAGE_NUMBER}
    Should Be True    ${current_page} > 1    Expected current page number to be greater than 1, but got ${current_page}

I Should See The First Page Of Tasks
    ${current_page}=    Get Text    ${CURRENT_PAGE_NUMBER}
    Should Be Equal As Numbers    ${current_page}    1    Expected current page number to be 1, but got ${current_page}

The Current Page Number Should Be Updated
    ${current_page}=    Get Text    ${CURRENT_PAGE_NUMBER}
    Should Match Regexp    ${current_page}    ^\\d+$    Expected current page number to be a digit, but got ${current_page}

I Should See The Current Page Number
    ${current_page}=    Get Text    ${CURRENT_PAGE_NUMBER}
    Should Match Regexp    ${current_page}    ^\\d+$    Current page number not visible

I Should See The Total Number Of Pages
    ${total_pages}=    Get Text    ${TOTAL_PAGES}
    Should Match Regexp    ${total_pages}    ^\\d+$    Total number of pages not visible

The Next Button Should Be Disabled
    Wait For Elements State    ${NEXT_BUTTON}    disabled    message=Next button is enabled, but it should be disabled

The Previous Button Should Be Disabled
   Wait For Elements State    ${PREVIOUS_BUTTON}    disabled    message=Previous button is enabled, but it should be disabled
