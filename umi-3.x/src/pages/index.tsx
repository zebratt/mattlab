import { useSelector } from 'react-redux';
import { RootState, store } from 'umi';
import $ from './index.less';

export default function IndexPage() {
  const { loading } = useSelector((state: RootState) => state.app);
  const { auth } = useSelector((state: RootState) => state.auth);

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
      <div>auth: {auth}</div>
      <button
        onClick={() => {
          store.dispatch.auth.updateAuth({
            nextAuth: false,
          });
        }}
      >
        update auth
      </button>
    </div>
  );
}
