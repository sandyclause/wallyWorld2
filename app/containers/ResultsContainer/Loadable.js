/**
 * Asynchronously loads the component for ResultsContainer page
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
