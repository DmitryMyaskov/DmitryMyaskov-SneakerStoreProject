import ContentLoader from "react-content-loader"
import'../productContainer/catalog.scss';


export const Skeleton = () => (
  <ContentLoader 
    className='product-cards__item'
    speed={2}
    width={299.99}
    height={412.59}
    viewBox="0 0 299.99 412.59"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="299.99" height="412.59" />
  </ContentLoader>
)

