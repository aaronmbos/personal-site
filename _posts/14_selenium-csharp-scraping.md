---
id: 14
slug: selenium-csharp-scraping
title: "Scraping HTML with Selenium and C#"
description: In this post, we'll be going over how we can use Selenium WebDriver and C# to scrape HTML from websites. I recently started working on a personal project that I plan to use for gathering English Premier League player statistics for my fantasy team. I had a fun time getting Selenium set up and working so I thought I'd share.
publishedAt: 2021-07-29T00:47:38.660Z
updatedAt: 2021-07-29T13:02:14.520Z
metadata: web,dev,dotnet,csharp,selenium,scraping
---
## What is Selenium WebDriver?

Let's start by discussing Selenium WebDriver at a high level. Selenium is a suite of browser automation tools and Selenium WebDriver specifically, is one of the tools that can be used to automate browser interactions. In the context of this post, we'll be talking about using Selenium WebDriver to scrape HTML from web pages, but it is also commonly used for browser-based testing.

Selenium WebDriver communicates directly to the web browser via a "driver". This driver enables two-way communication between the browser and driver. So the driver is able to issue commands to the web browser and the browser is able to respond back to the driver. Drivers are browser-specific, for example, the Firefox driver (also known as GeckoDriver) will communicate with Mozilla Firefox, and the ChromeDriver will communicate with Google Chrome. This two-way communication allows Selenium to expose an API for performing actions in the browser like selecting and clicking on elements.

If you would like to learn some more about Selenium WebDriver, head over to their [documentation](https://www.selenium.dev/documentation/en/webdriver/). I found the docs to be very thorough and helpful as I was working through this for the first time. Now that we have a basic understanding of Selenium WebDriver, let's get into the details of setting up our environment.

## Getting Started

First, you'll need to download the driver for the browser you'd like to use. Personally, I would choose your daily browser, but you can choose any driver for a browser that you have installed on the machine that the driver will be running on. A list of browser drivers with download links can be found [here](https://www.selenium.dev/documentation/en/webdriver/driver_requirements/#quick-reference). There is also an option to communicate with the driver and browser remotely (on a different machine) with the Selenium Server or Grid tools, but for the purpose of this post we'll be running the driver and browser on our own machine.

Once you have the driver executable downloaded, you'll need to add its location to your PATH variable. For example, I placed the GeckoDriver executable in this location on my Mac `/opt/WebDriver/bin` and added it to my PATH variable with the following command.

```
# I would recomended adding this to your .bash_profile or .zshrc so that the command gets ran in each new instance of a terminal
export PATH=$PATH:/opt/WebDriver/bin
```

With the driver installed and added to the PATH we're ready to jump in and start writing some code!

## Setting Up Application and Dependencies
As I mentioned at the beginning of this post, I recently started a side project that uses Selenium WebDriver to gather English Premier League statistics. For this project, I created a .NET 5 Console application. The type of application isn't too important for this context, that just depends on how you intend to consume or process the information.

Once we have a project created we'll have to install the necessary NuGet packages for Selenium. The first one we need is [Selenium.WebDriver](https://www.nuget.org/packages/Selenium.WebDriver/4.0.0-beta4), which can be installed with this command.

```
dotnet add package Selenium.WebDriver --version 4.0.0-beta4
```

The next package that we'll need to add will be specific to the browser driver that was chosen earlier. For example, I chose GeckoDriver (Firefox) so I need to download [Selenium.Firefox.WebDriver](https://www.nuget.org/packages/Selenium.Firefox.WebDriver/). A list of Selenium packages can be found [here](https://www.nuget.org/packages?q=Selenium.).

```
dotnet add package Selenium.Firefox.WebDriver --version 0.27.0
```

With the main Selenium.WebDriver and driver-specific NuGet Packages added to our project we're ready to start testing things out. The following code will be executable inside of any application, but we'll be looking at it from the lens of a Console application.

First, we'll add the using statements to the file. This will make the necessary Selenium classes available for us to use.

```
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
```

Next up is creating an instance of `FirefoxDriver`, which is used to make the web page requests and does most of the heavy lifting. One thing to note is that `FirefoxDriver` implements `IDisposable` so it's recommended to dispose of the driver resources after completing our work with it and we can do this with a `using` statement. On top of the resource disposal, we'll also want to call the `Quit()` method on `FirefoxDriver`. It's a good idea to wrap our web scraping code in a try/finally block so that we always call `Quit()`, even if an exception is thrown. Here is an example.

```
using (IWebDriver driver = new FirefoxDriver())
{
    try
    {
        // Do some web scraping
    }
    finally 
    {
        driver.Quit();
    }
}
```

With that bit of code in place, we're ready to start making web requests and using the functionality of Selenium to get specific data from the requested HTML. The first step is to call the `Navigate()` method followed up with `GoToUrl("https://google.com")`. These methods are both pretty self-explanatory. Calling `Navigate` will return an `INavigation` implementation that exposes the `GoToUrl` method, which actually opens an instance of the browser and goes to the URL specified `string url` parameter. These steps end up looking like the example below.

```
using (IWebDriver driver = new FirefoxDriver())
{
    try
    {
        driver.Navigate().GoToUrl(@"https://fantasy.premierleague.com/statistics");
    }
    finally 
    {
        driver.Quit();
    }
}
```

The next step is to actually select the data on the page that we are interested in. There are **many** methods available for selecting specific pieces of HTML, but I'll be going through the one that I find to be most versatile. I would highly suggest looking through the Selenium documentation to determine what works best for the situation you're in. In this example we'll be finding an HTML element with the use of a CSS selector, just like we would select an element in a .css file. There are helper methods available to get elements by ID and class name, but we'll just be going with a raw selector. So building on our previous code sample we'll add in the ability to grab Teams from a dropdown menu.

```
using (IWebDriver driver = new FirefoxDriver())
{
    try
    {
        driver.Navigate().GoToUrl(@"https://fantasy.premierleague.com/statistics");
        // Select an element with id filter followed by an optgroup element with the label attribute value "By Team"
        // Use the Text property to return the text of each select option
        var teams = driver.FindElement(By.CssSelector(#filter optgroup[label=\"By Team\"])).Text;
        Console.WriteLine(teams);
    }
    finally 
    {
        driver.Quit();
    }
}
```

To add a bit more color to this example here are screenshots of both the webpage and dev tools HTML that we selected in the code above.

This screenshot contains the dropdown options that we are selecting the text from.
![selenium-team-dropdown.png](https://res.cloudinary.com/aaron-bos/image/upload/v1627519254/selenium_team_dropdown_d297a1136e.png)

This is the HTML representing the dropdown above.
![selenium-team-dev-tools.png](https://res.cloudinary.com/aaron-bos/image/upload/v1627519278/selenium_team_dev_tools_16074672f3.png)

Beyond just selecting HTML elements we can actually click on elements via Selenium. The following example selects a collection of HTML button elements with the given CSS selector, iterates through the collection, and calls the `.Click()` method on each element. In the context of this example a dialog element is then displayed to the user on the web page we requested.

```
using (IWebDriver driver = new FirefoxDriver())
{
    try
    {
        driver.Navigate().GoToUrl(@"https://fantasy.premierleague.com/statistics");
        foreach (var btn in driver.FindElements("div#root div:nth-child(2) table tbody button")
        {
            if (btn.Text.Contains("View player information")) 
            {
                btn.Click();
                // Close the modal dialog
                driver.FindElement(
                    By.CssSelector("div#root-dialog > div[role=\"presentation\"] > dialog > div div:nth-child(1) button")
                ).Click();
            }
        }
    }
    finally 
    {
        driver.Quit();
    }
}
```

Selenium WebDriver is a powerful tool that can be useful for automated testing, web scraping, and more. ,If you'd like to see a full working example of this code head over to the [project](https://github.com/aaronmbos/epl-stats) that I'm working on and see how all the pieces come together in a full application. I hope this post was helpful in providing a starting point for collecting data from HTML with Selenium WebDriver and C#.
