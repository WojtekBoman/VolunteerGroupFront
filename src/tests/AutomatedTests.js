const { Builder, By, Key, utill } = require("selenium-webdriver");



async function dodajOferte() {

  let driver = new Builder().forBrowser("chrome").build();
  driver.get("https://wojtekboman.github.io/VolunteerGroup_Front");

  try {

    await driver.findElement(By.id("loginPageRef")).click();

    await driver.findElement(By.id("exampleInputEmail1")).sendKeys("prac@wp.pl");
    await driver.findElement(By.id("exampleInputhaslo1")).sendKeys("prac123");
    await driver.sleep(1000);
    await driver.findElement(By.id("loginButton")).click();
    await driver.sleep(1000);

    await driver.findElement(By.linkText("Oferty")).click();
   // await driver.findElement(By.id("showOffersLink")).click();
    await driver.findElement(By.id("addOfferLink")).click();

    await driver.findElement(By.id("exampleInputEventTitle")).sendKeys("Nowa oferta");
    await driver.findElement(By.id("examplePetName")).sendKeys("Grzesiu");
    await driver.findElement(By.id("exampleFoto")).sendKeys("https://cdn-3.cinemaparadiso.co.uk/film-stills/1337097-33819-clp-720.jpg");
    await driver.findElement(By.id("exampleFormOfferDescription")).sendKeys("Grzesiu szuka opiekuna");
    await driver.findElement(By.id("addOfferButton")).click();
    await driver.sleep(2000);

    await driver.findElement(By.id("nameFrom")).sendKeys("Grzesiu");
    await driver.sleep(1000);
    await driver.findElement(By.id("filterButton")).click();
    driver.executeScript('window.scrollTo(0,400);');
    await driver.sleep(1000);

    // await driver.findElement(By.linkText("Wyloguj")).click();



  } catch (err) {
    console.log(err);
  }
}


async function dodajNews() {

  let driver = new Builder().forBrowser("chrome").build();
  driver.get("https://wojtekboman.github.io/VolunteerGroup_Front");

  try {
  
 
  //   element = driver.findElement(By.linkText("Nowy news"));
  //  await  driver.executeScript("arguments[0].scrollIntoView()", element);
  

    await driver.findElement(By.id("loginPageRef")).click();
    await driver.findElement(By.id("exampleInputEmail1")).sendKeys("przewo@wp.pl");
    await driver.findElement(By.id("exampleInputhaslo1")).sendKeys("przewo");
    await driver.findElement(By.id("loginButton")).click();
    await driver.sleep(1000);

    await driver.findElement(By.id("addNewsMenu")).click();

    await driver.findElement(By.id("exampleInputEventTitle")).sendKeys("Kolejne schronisko we Wrocławiu");
    await driver.findElement(By.id("exampleFormOfferDescription")).sendKeys("Zakończyła się właśnie budowa schroniska przy ulicy Norwida.");
    await driver.findElement(By.id("addNewsButton")).click();
    await driver.sleep(1000);

    await driver.findElement(By.linkText("Wyloguj")).click();
    await driver.sleep(1000);
    await driver.executeScript('window.scrollTo(0,2700);');


  } catch (err) {
    console.log(err);
  }
}

async function sprawdzEncyklopedie() {

  let driver = new Builder().forBrowser("chrome").build();
  driver.get("https://wojtekboman.github.io/VolunteerGroup_Front");

  try {

    await driver.findElement(By.id("encyklopediaRef")).click();
    await driver.sleep(1500);

    await driver.findElement(By.id("exampleInputBreedOfDog")).sendKeys("Żyrafa");
    await driver.findElement(By.id("searchButton")).click();
    await driver.sleep(1500);

    await driver.findElement(By.id("exampleInputBreedOfDog")).clear();
    await driver.findElement(By.id("exampleInputBreedOfDog")).sendKeys("Husky");
    await driver.findElement(By.id("searchButton")).click();
    await driver.executeScript('window.scrollTo(0,300);');
    await driver.sleep(1500);

    await driver.findElement(By.id("exampleInputBreedOfDog")).clear();
    await driver.findElement(By.id("exampleInputBreedOfDog")).sendKeys("Labrador");
    await driver.findElement(By.id("searchButton")).click();
    await driver.sleep(1500);

    // await driver.findElement(By.linkText("Wyloguj")).click();



  } catch (err) {
    console.log(err);
  }
}

// dodajNews();
// dodajOferte();
// sprawdzEncyklopedie();





