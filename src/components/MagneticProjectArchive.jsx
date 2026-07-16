import CometCard from './CometCard.jsx';
import watsonsCover from '../../AI作品集封面/AI 创意广告-屈臣氏（优秀奖）.jpg';
import lenovoCover from '../../AI作品集封面/AI 创意广告-联想（联想特别鸣谢奖_官号转发）.jpg';
import tongyiCover from '../../AI作品集封面/AI 创意广告-通义万相先导片（官号首发）.jpg';
import chageeCover from '../../AI作品集封面/AI 创意广告-霸王茶姬（中国联通三等奖）.jpg';
import catsCover from '../../AI作品集封面/AI 创意短片-猫咪的一天（中国联通三等奖）.jpg';
import yueyangCover from '../../AI作品集封面/AI 文旅宣传-岳阳楼（优秀奖_超棒奖）.jpg';
import riverCityCover from '../../AI作品集封面/AI 概念短片-人河流城市（MJ 官方优秀作品）.jpg';
import lightCover from '../../AI作品集封面/AI 概念短片-光（通义光引-还不错奖｜通义生动-优秀奖）.jpg';
import './CometCard.css';

const ARCHIVES = [
  { id: '01', title: '无声的回响', summary: 'AI 视频作品档案，封面与原片待补充。', cover: watsonsCover, status: '已归档' },
  { id: '02', title: '人河流城市', summary: 'AI 视频作品档案，封面与原片待补充。', cover: lenovoCover, status: '已归档' },
  { id: '03', title: '视觉实验', summary: '项目封面、作品信息与链接待补充。', cover: tongyiCover, status: '待补充' },
  { id: '04', title: '风格化成片', summary: '项目封面、作品信息与链接待补充。', cover: chageeCover, status: '待补充' },
  { id: '05', title: '生成叙事', summary: '项目封面、作品信息与链接待补充。', cover: catsCover, status: '待补充' },
  { id: '06', title: '镜头实验', summary: '项目封面、作品信息与链接待补充。', cover: yueyangCover, status: '待补充' },
  { id: '07', title: '动态海报', summary: '项目封面、作品信息与链接待补充。', cover: riverCityCover, status: '待补充' },
  { id: '08', title: '交互实验', summary: '项目封面、作品信息与链接待补充。', cover: lightCover, status: '待补充' },
];

export default function MagneticProjectArchive() {
  return (
    <div className="comet-archive" role="list" aria-label="AI 视频创作档案">
      {ARCHIVES.map(archive => (
        <CometCard key={archive.id} className="comet-archive__item">
          <button
            type="button"
            className={`comet-archive__card${archive.cover ? '' : ' is-placeholder'}`}
            aria-label={`${archive.id} ${archive.title}，${archive.status}`}
            style={{ '--comet-cover': archive.cover ? `url(${archive.cover})` : 'none' }}
          >
            <span className="comet-archive__image" aria-hidden="true" />
            <span className="comet-archive__veil" aria-hidden="true" />
            <span className="comet-archive__copy">
              <span className="comet-archive__meta">{archive.id} / {archive.status}</span>
              <strong>{archive.title}</strong>
              <span className="comet-archive__hint">查看档案</span>
            </span>
          </button>
        </CometCard>
      ))}
    </div>
  );
}
