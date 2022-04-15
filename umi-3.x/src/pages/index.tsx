import { Tooltip } from 'infosysD';
import 'infosysD/lib/tooltip/style/index';
import $ from './index.less';

export default function IndexPage() {
  return (
    <div className={$.page}>
      <Tooltip title="this is title blablabla" placement="topLeft">
        <div className={$.title}>this is a title</div>
      </Tooltip>
    </div>
  );
}
