import axios from 'axios'


const api = axios.create({
baseURL: 'https://api.coingecko.com/api/v3',
timeout: 15000,
})


export async function fetchMarkets({ vs_currency = 'usd', per_page = 50, page = 1 } = {}){
const res = await api.get('/coins/markets', {
params: { vs_currency, order: 'market_cap_desc', per_page, page, sparkline: false }
})
return res.data
}


export async function fetchCoin(id){
const res = await api.get(`/coins/${id}`, { params: { localization: false, tickers: false, market_data: true, community_data: false, developer_data: false, sparkline: false }})
return res.data
}


export async function searchCoins(query){
const res = await api.get('/search', { params: { query } })
return res.data
}


export default api