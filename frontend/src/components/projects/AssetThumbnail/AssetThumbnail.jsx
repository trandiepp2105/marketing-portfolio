import './AssetThumbnail.scss';

function AssetThumbnail({ asset, onSelect }) {
  return (
    <button
      className="asset-thumbnail"
      type="button"
      onClick={() => onSelect(asset)}
      aria-label={`View image: ${asset.title}`}
    >
      <span className="asset-thumbnail__image">
        <img src={asset.thumbnail} alt={asset.alt} loading="lazy" />
      </span>
      <span className="asset-thumbnail__title">{asset.title}</span>
    </button>
  );
}

export default AssetThumbnail;
