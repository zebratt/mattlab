import { useSelector } from 'react-redux';
import { RootState, store } from 'umi';
import $ from './index.less';

export default function IndexPage() {
  const { loading, count } = useSelector((state: RootState) => state.app);
  const { auth, num } = useSelector((state: RootState) => state.auth);

  return (
    <div className={$.page}>
      <button
        onClick={() => {
          store.dispatch.app.stopLoading({
            next: false,
          });
        }}
      >
        stop loading
      </button>
      {loading ? <div>I am loading!</div> : <div>stopped</div>}
      <div>auth num: {num}</div>
      <button
        onClick={() => {
          store.dispatch.auth.updateNum(999);
        }}
      >
        update auth num
      </button>
    </div>
  );
}
