
## start
yarn 
yarn start

## Testing  curl 

curl --location --request POST 'http://127.0.0.1:4000/data' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dateFrom":"2021-04-15T11:53:28Z",
    "dateTo":"2021-05-20T11:53:28Z"
}'


## list of data
curl --location --request GET 'http://127.0.0.1:4000/list'
