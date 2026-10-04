import AssetThumbnail from '../AssetThumbnail/AssetThumbnail';
import './AssetGallery.scss';

function AssetGallery({ assets, onSelect }) {
  if (!assets.length) {
    return null;
  }

  return (
    <section className="asset-gallery" aria-label="Project assets and highlights">
      <div className="asset-gallery__heading">
        <span aria-hidden="true">photo_library</span>
        <h4>Project assets & highlights</h4>
        <small>{assets.length} highlights</small>
      </div>
      <div className="asset-gallery__items">
        {assets.map((asset) => (
          <AssetThumbnail key={asset.title} asset={asset} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

export default AssetGallery;
