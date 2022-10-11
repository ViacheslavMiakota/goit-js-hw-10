export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?&access_key%20=%2012e3227c35c24f8f0022f0638672f572&fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
