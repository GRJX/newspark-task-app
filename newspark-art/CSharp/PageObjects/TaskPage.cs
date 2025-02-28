using Microsoft.Playwright;
using System.Threading.Tasks;

namespace Newspark.PageObjects;

public class TasksPage
{
    private readonly IPage _page;
    private readonly ILocator _nextButton;
    private readonly ILocator _previousButton;
    private readonly ILocator _currentPageNumber;
    private readonly ILocator _totalPages;
    private readonly ILocator _titleInput;
    private readonly ILocator _editTitleInput;
    private readonly ILocator _addTaskButton;
    private readonly ILocator _applyButton;
    private readonly ILocator _confirmDeleteButton;
    private readonly string _url = "http://localhost:5173/tasks";

    public TasksPage(IPage page)
    {
        _page = page;
        _nextButton = _page.Locator("[data-testid='next-button']");
        _previousButton = _page.Locator("[data-testid='previous-button']");
        _currentPageNumber = _page.Locator("[data-testid='current-page-number']");
        _totalPages = _page.Locator("[data-testid='total-page-number']");
        _titleInput = _page.Locator("[data-testid='title-input']");
        _editTitleInput = _page.Locator("[data-testid='edit-title-input']");
        _addTaskButton = _page.Locator("[data-testid='add-task-button']");
        _applyButton = _page.Locator("[data-testid='apply-button']");
        _confirmDeleteButton = _page.Locator("[data-testid='delete-button']");
    }

    public async Task Navigate()
    {
        await _page.GotoAsync(_url);
    }

    public async Task ClickNext()
    {
        await _nextButton.ClickAsync();
    }

    public async Task ClickPrevious()
    {
        await _previousButton.ClickAsync();
    }

    public async Task<int> GetCurrentPageNumber()
    {
        string text = await GetCurrentPageNumberText();
        if (int.TryParse(text, out int result))
        {
            return result;
        }
        return 1;
    }

    public async Task<string> GetCurrentPageNumberText()
    {
        return await _currentPageNumber.TextContentAsync() ?? "1";
    }

    public async Task<string> GetTotalPages()
    {
        return await _totalPages.TextContentAsync() ?? "1";
    }

    public async Task<bool> IsNextButtonVisible()
    {
        return await _nextButton.IsVisibleAsync();
    }

    public async Task<bool> IsPreviousButtonVisible()
    {
        return await _previousButton.IsVisibleAsync();
    }

    public async Task<bool> IsPaginationVisible()
    {
        return await IsNextButtonVisible() && await IsPreviousButtonVisible();
    }

    public async Task<bool> IsNextButtonEnabled()
    {
        return await IsNextButtonVisible() && !(await IsNextButtonDisabled());
    }

    public async Task<bool> IsPreviousButtonEnabled()
    {
        return await IsPreviousButtonVisible() && !(await IsPreviousButtonDisabled());
    }

    public async Task<bool> IsNextButtonDisabled()
    {
        string disabled = await _nextButton.GetAttributeAsync("disabled");
        return disabled != null;
    }

    public async Task<bool> IsPreviousButtonDisabled()
    {
        string disabled = await _previousButton.GetAttributeAsync("disabled");
        return disabled != null;
    }

    public async Task EnterTaskTitle(string taskTitle)
    {
        await _titleInput.FillAsync(taskTitle);
    }

    public async Task ClickAddTaskButton()
    {
        await _addTaskButton.ClickAsync();
    }

    public async Task<bool> IsTaskInTable(string taskTitle)
    {
        var taskLocator = _page.Locator($"table tr:has-text('{taskTitle}')");
        return await taskLocator.IsVisibleAsync();
    }

    public async Task ClickEditButton(string taskTitle)
    {
        var editButton = _page.Locator($"table tr:has-text('{taskTitle}') >> [data-testid*='edit-task-button']");
        await editButton.ClickAsync();
    }

    public async Task UpdateTaskTitle(string newTaskTitle)
    {
        await _editTitleInput.FillAsync(newTaskTitle);
    }

    public async Task ClickApplyButton()
    {
        await _applyButton.ClickAsync();
    }

    public async Task ClickDeleteButton(string taskTitle)
    {
        var deleteButton = _page.Locator($"table tr:has-text('{taskTitle}') >> [data-testid*='delete-task-button']");
        await deleteButton.ClickAsync();
    }

    public async Task ConfirmDeletion()
    {
        await _confirmDeleteButton.ClickAsync();
    }

    public async Task ClearTaskInput()
    {
        await _titleInput.FillAsync(string.Empty);
    }

    public async Task ClearEditInput()
    {
        await _editTitleInput.FillAsync(string.Empty);
    }
}
