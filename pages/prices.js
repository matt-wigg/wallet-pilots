import styles from '../styles/Prices.module.css';
// swap to SWR https://swr.vercel.app/docs/getting-started
export async function getServerSideProps({ req, res }) {
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  const endpoint =
    req.headers.host === 'localhost:3000'
      ? `http://${req.headers.host}/api/coinmarket/get-current-prices`
      : `https://${req.headers.host}/api/coinmarket/get-current-prices`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    const response = await fetch(endpoint, options);
    const prices = await response.json();
    return {
      props: { prices },
    };
  } catch (error) {
    console.log(error);
    return {
      props: error,
    };
  }
}

const Prices = ({ prices, error }) => {
  return (
    <div className={styles.priceContainer}>
      {error && console.log(erorr)}
      {prices.map((price, index) => {
        return (
          <div className={styles.prices} key={price.id}>
            {index + 1}. {price.name}: $
            {price.quote.USD.price
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div> // rounds to two decimals: USD and add comma seperators
        );
      })}
    </div>
  );
};

export default Prices;
