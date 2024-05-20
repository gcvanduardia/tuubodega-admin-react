const production = {
    production: true,
    apiUrl: 'https://api.tuubodega.com',
    apiKey: 'tuubodegaAuth'
}

const local = {
    production: false,
    apiUrl: 'http://localhost:3000',
    apiKey: 'tuubodegaAuth'
}

const use = local;

export const environment = {
    production: true,
    apiUrl: use.apiUrl,
    apiKey: use.apiKey,
};