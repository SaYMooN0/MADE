window.setTheme = (theme) => {
    document.documentElement.style.setProperty('--back', theme.mainBackColor);
    document.documentElement.style.setProperty('--back-2', theme.secondBackColor);
    document.documentElement.style.setProperty('--back-3', theme.thirdBackColor);
    document.documentElement.style.setProperty('--front', theme.mainFrontColor);
    document.documentElement.style.setProperty('--front-2', theme.secondFrontColor);
    document.documentElement.style.setProperty('--front-3', theme.thirdFrontColor);
    document.documentElement.style.setProperty('--bright', theme.mainBrightColor);
    document.documentElement.style.setProperty('--bright-2', theme.secondBrightColor);
    document.documentElement.style.setProperty('--bright-3', theme.thirdBrightColor);
    document.documentElement.style.setProperty('--warning-main', theme.warningMainColor);
    document.documentElement.style.setProperty('--warning-bright', theme.warningBrightColor);
};