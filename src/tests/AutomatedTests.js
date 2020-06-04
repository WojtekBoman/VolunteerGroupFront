const{Builder, By, Key, utill} = require("selenium-webdriver");
async function startTest(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://wojtekboman.github.io/VolunteerGroup_Front")
    await driver.findElement(By.name("q")).sendKeys("onet.pl",Key.RETURN)
}
// startTest();