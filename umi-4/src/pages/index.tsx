import CustomRequest from 'info-request';

const ctRequest = new CustomRequest();
ctRequest.init({
  prefix: 'http://localhost:8888',
});
const { request } = ctRequest;

export default function HomePage() {
  return (
    <div>
      <h1>home page</h1>
      <button onClick={() => {
          request('/api/abc').then(() => {
            console.log('sucess');
          }).catch(() => {
            console.log('error');
          })
      }}>click</button>
    </div>
  );
}
