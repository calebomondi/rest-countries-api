//back arrow function
function goback(){
    window.history.back();
}
document.getElementById("goback").addEventListener("click",goback);

//get image source from localstorage
let src = localStorage.getItem('targetSrc');

//connect to api
async function getCountries() {
    let url = 'https://restcountries.com/v3.1/all?fields=name,flags,currencies,capital,region,subregion,languages,area,population,tld,borders,cca3,maps';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}  

//render selected country that matches flag src
async function renderCountry() {
    let countries = await getCountries();
    let html = '';

    countries.forEach(country => {
        if(country.flags.png == src) {
            //change page title
            document.querySelector('title').innerHTML = country.name.common;
            //change favicon
            document.querySelector('link').setAttribute('href',country.flags.png);
            //select native language
            let nativeLang = country.name.nativeName;
            let natLang = nativeLang[Object.keys(nativeLang)[0]].official;
            //select currency
            let curr = country.currencies;
            let currName = curr[Object.keys(curr)[0]].name;
            //get languages
            let spoken = '';
            let languages = country.languages;
            for(const lang of Object.values(languages)) {
                let plusSpace = lang + ', ' ;
                spoken += plusSpace; 
            }
            //DOM
            let htmlSegment = `
                        <div class="flags">
                            <img src="${country.flags.png}" alt="${country.name.common} flag" id="selected_country">
                        </div>
                        <div class="facts">
                            <div id="ccc">
                                <div class="info">
                                    <h3 id="off_name">${country.name.common}</h3>
                                    <div class="lvl">
                                        <div>
                                            <h6>Native Name:</h6>
                                            <p id="nat-name">${natLang}</p>
                                        </div>
                                        <div>
                                            <h6>Population:</h6>
                                            <p id="pop">${country.population}</p>
                                        </div>
                                    </div>
                                    <div class="lvl">
                                        <div>
                                            <h6>Region:</h6>
                                            <p id="reg">${country.region}</p>
                                        </div>
                                        <div>
                                            <h6>Sub Region:</h6>
                                            <p id="sub-reg">${country.subregion}</p>
                                        </div>
                                    </div>
                                    <div class="lvl">
                                        <div>
                                            <h6>Capital:</h6>
                                            <p id="cap">${country.capital[0]}</p>
                                        </div>
                                        <div>
                                            <h6>Area:</h6>
                                            <p id="area">${country.area} km²</p>
                                        </div>
                                    </div>
                                    <div class="lvl">
                                        <div>
                                            <h6>Top Level Domain:</h6>
                                            <p id="nat-name">${country.tld[0]}</p>
                                        </div>
                                        <div>
                                            <h6>Currencies:</h6>
                                            <p id="curr">${currName}</p>
                                        </div>
                                    </div>
                                    <div style="width: 100%;">
                                        <h6>Languages:</h6>
                                        <p id="lang">${spoken}</p> 
                                    </div>
                                </div>
                                <div id="map"><i class='bx bx-globe'></i><u>map</u></div>
                                <div class="borders">
                                    <div class="bdrtxt">
                                        <h6>Border Countries:</h6> 
                                    </div>
                                    <div class="bdrctry">
                                        <button type="button" class="btn btn-light btn-sm">France</button>
                                        <button type="button" class="btn btn-light btn-sm">Germany</button>
                                        <button type="button" class="btn btn-light btn-sm">Netherlands</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;
            html += htmlSegment;
        }
    });

    document.querySelector('.flag_facts').innerHTML = html;
}
renderCountry();

//DOM for border countries
async function borders() {
    let borderCountries = await getCountries();
    borderCountries.forEach(country => {
        if(country.flags.png == src) {
            if(country.borders != undefined) {
                let borders = country.borders;
                let html = '';
                for(const brdrctr of borders) {
                    borderCountries.forEach(country => {
                        if(brdrctr == country.cca3) {
                            let htmlSegment = `
                                    <button type="button" class="btn btn-light btn-sm">${country.name.common}</button>
                                `;
                            html += htmlSegment;
                        }
                    });
                }
                let countries = document.querySelector('.bdrctry');
                countries.innerHTML = '';
                countries.innerHTML = html;
            }
        }
    });
}
borders()

//Event listner on button click
async function btnClick() {
    let borderCountries = await getCountries();
    let buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            let countryName = button.textContent;
            borderCountries.forEach(country => {
                if(country.name.common == countryName) {
                    localStorage.setItem('targetSrc',country.flags.png);
                    window.open('countryfacts.html','_self');
                }
            });
        });
    });
}
btnClick();

async function map() {
    let countries = await getCountries();
    let link = document.getElementById('map');

    link.addEventListener('click', function() {
        countries.forEach(country => {
            if(country.flags.png == src) {
                let href = country.maps.googleMaps;
                window.open(href,'_blank');
            }
        });
    });
}
map();