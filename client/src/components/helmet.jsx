import Helmet from "react-helmet";
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - BuyIt`}</title>
    </Helmet>
  );
};

export default MetaData;
