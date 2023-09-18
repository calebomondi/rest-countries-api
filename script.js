/**
 * Connect API 
 */
//get countries function
async function getCountries() {
    let url = 'https://restcountries.com/v3.1/all?fields=name,flags,currencies,capital,region,subregion,languages,area,population';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
//render countries
async function renderCountries() {
    let countries = await getCountries();
    let html = '';
    countries.forEach(country => {
        let htmlSegment = `
                        <div class="countryfacts">
                            <div class="flags">
                                <img src="${country.flags.png}" href="countryfacts.html" alt="${country.name.common} flag" class="countryFlag">
                            </div>
                            <div class="facts">
                                <h4>${country.name.common}</h4>
                                <div>
                                    <h5>Population:</h5><p id="pop"> ${country.population}</p>
                                </div>
                                <div>
                                    <h5>Region:</h5><p id="reg"> ${country.region}</p>
                                </div>
                                <div>
                                    <h5>Capital:</h5><p id="cap"> ${country.capital[0]}</p>
                                </div>
                            </div>
                        </div> 
        `;

        html += htmlSegment;
    });

    let container = document.querySelector('.maincontent');
    container.innerHTML = html;
    imgClick();
}
//call function
renderCountries();

/*
*search operations and functions
*/
//selector
const search = document.getElementById("search");
//eventlistener on keydown
search.addEventListener('keydown', function(event) {
    if(event.key === 'Enter'){
        performSearch();
    }
});
//function to call
async function performSearch() {
    const query = search.value.toLowerCase().trim();
    let countries = await getCountries();
    //loop through array with every() to allow breakpoint
    countries.every( country => {
        if(query == country.name.common.toLowerCase()) {
            let container = document.querySelector('.maincontent');
            container.innerHTML = '';
            container.innerHTML = `
                            <div class="countryfacts">
                                <div class="flags">
                                    <img src="${country.flags.png}" href="countryfacts.html" alt="${country.name.common} flag" class="countryFlag">
                                </div>
                                <div class="facts">
                                    <h4>${country.name.common}</h4>
                                    <div>
                                        <h5>Population:</h5><p id="pop"> ${country.population}</p>
                                    </div>
                                    <div>
                                        <h5>Region:</h5><p id="reg"> ${country.region}</p>
                                    </div>
                                    <div>
                                        <h5>Capital:</h5><p id="cap"> ${country.capital[0]}</p>
                                    </div>
                                </div>
                            </div> 
                     `;

            return false;
        }
        return true;
    });
    imgClick();
}

/*
*filter operations and functions
*/
const dropdown_items = document.querySelectorAll('.dropdown-item');

//determine which li element has been selected
dropdown_items.forEach(item => {
    item.addEventListener('click',function(){
        let region = item.textContent;
        filter(region);
    })
});

async function filter(region) {
    let countries = await getCountries();
    //clear .maincontent
    let container = document.querySelector('.maincontent');
    container.innerHTML = '';
    //var
    let html = '';
    //find region using if...else statement
    countries.forEach(country => {
        if(country.region == region) {
            let htmlSegment = `
                    <div class="countryfacts">
                        <div class="flags">
                            <img src="${country.flags.png}" href="countryfacts.html" alt="${country.name.common} flag" class="countryFlag">
                        </div>
                        <div class="facts">
                            <h4>${country.name.common}</h4>
                            <div>
                                <h5>Population:</h5><p id="pop"> ${country.population}</p>
                            </div>
                            <div>
                                <h5>Region:</h5><p id="reg"> ${country.region}</p>
                            </div>
                            <div>
                                <h5>Capital:</h5><p id="cap"> ${country.capital[0]}</p>
                            </div>
                        </div>
                    </div> 
                    `;
            html += htmlSegment;
        }
    });
    container.innerHTML = html;
    imgClick();
}

/*
*Onclick image it takes you to the countryfacts page
*the function is called on each screen render
*/

function imgClick() {
    let countryFlags = document.querySelectorAll('.countryFlag');
    countryFlags.forEach(countryFlag => {
    countryFlag.addEventListener('click', function(event){
            event.preventDefault();
            let image = event.target;
            let src = image.getAttribute('src');
            localStorage.setItem('targetSrc',src);
            let href = image.getAttribute('href');
            window.open(href,'_blank');
        });
    });
}

