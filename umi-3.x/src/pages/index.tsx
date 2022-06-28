import { useSelector } from 'react-redux';
import { RootState, store } from 'umi';
import $ from './index.less';

export default function IndexPage() {
  const { loading } = useSelector((state: RootState) => state.app);

  return (
    <div className={$.page}>
      <button
        onClick={() => {
          store.dispatch.app.stopLoading();
        }}
      >
        stop loading
      </button>
      {loading ? <div>I am loading!</div> : <div>stopped</div>}
    </div>
  );
}
