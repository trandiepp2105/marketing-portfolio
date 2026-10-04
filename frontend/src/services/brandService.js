/** Static brand resources from the portfolio design. */
const brands = [
  {
    slug: 'crossfire-legends',
    name: 'Crossfire: Legends',
    projectName: 'Crossfire: Legends',
    companyName: 'VNG',
    category: 'FPS Mobile Esports',
    description:
      'Crossfire: Legends là tựa game bắn súng góc nhìn thứ nhất (FPS) đỉnh cao trên di động, mang đến trải nghiệm chiến đấu chân thực và kịch tính ngay trong lòng bàn tay. Người chơi sẽ được bước vào những trận đấu rực lửa, nơi tốc độ, chiến thuật và kỹ năng bắn súng quyết định chiến thắng.',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArqP9XVt4yu66PQF9TIqOgGEj-5taxikPhuC2SghYLX_ahxpj1a2JVDcrZi98LFmHB5kXmUWvj0vWkN5cyvy74ILGwc2qamkwCKMlbf8guuGMSXDqiNsoHtjccJNuQzvWW9BYhgMTliUofweVx8U7--6ZZtFUmSCwTEDjsWdojJlIU4ivlzwuL6WgSgzBfsX39nXC23TFTo4VLps-CS7ZhZQ9u8UzYaKKO2I3k-xCUdSLI-rrQcoESZq6mZy7_HPLh1Vk',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyZXFPe_IvhD6Fz_bVaWMxeMSyEzw9itEEEus7jNP0rxY78LjQX4UYJeFkAwolX-jnpkIAvxa_hwvo2nZUeGOqh3PhI6ag9Qyhb1mrOHhdr9c87w27ptLgD5zHitl6ESKuzklJsf1DyPjDKK9xlf7h3QXaWtmkISWAjoNqZ5fW5IuBXB7fDca2tHczfNr28Knfq5P8dS6hdW9APSGFn9zZRvI4dpbYdswf5etUBoZS1x87MyrbNsuFrEgfn9MDA9f_xUo',
    thumbnailAlt: 'Crossfire: Legends Collab Thumbnail',
    iconAlt: 'Crossfire: Legends App Icon',
  },
  {
    slug: 'play-together',
    name: 'Play Together VNG',
    projectName: 'Play Together',
    companyName: 'VNG',
    category: 'Metaverse Casual',
    description:
      'Play Together là một tựa game thực tế ảo, nơi người chơi có thể tương tác với nhau và tham gia nhiều hoạt động đa dạng như game party, câu cá,... và tạo ra thế giới trò chơi riêng của bạn.',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9kUsTZLKAgGB6t8YZMiaxCT3rjGDyVhWULN9GHRFCWPhwZXH1vzqakmORL4LHRv0b7ISDpKsCxwTXlmn0DYG1zz5ZeF-q-R3m-FHcoEmaUckT7oEmfyi13bD1FgZQAVizoVzo9MWHMQ1AFEaFUInKbjZWZX-BFXQb-J_z_to5TQa5hozXpqa74muCcIqQcqOb5t_Lf6uqui5B_qqjrMfUc6bKISNmMOhYp38IMGo6dNREzHlq4LLS0rxF8aytzIR_qekpataps9MYPKo',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjw4sdcmIxZ5FBmC-vPew1RCdJerQbRaWdHNM2nwTB-lK4qCo5SEfjaEFN5njIWr-a0Omslgd5EsKk7LGem8YJFLNfI75EBWa-bnkLB0bB1XdFZ1r2VJhPJiQlKC188FFSSqr8GUmH8OQtC9Fox49c3gyujQi0O_UtntHK0FsMniDdlSMI6wj9cc7nGgYg1U9m26SPJKNosYFy6hv-qF12087LP0b1W4AOMfmI5JuVOyzDhJFxMIn5KVk3aqeukoYCFVg',
    thumbnailAlt: 'Play Together Collab Thumbnail',
    iconAlt: 'Play Together App Icon',
  },
];

/**
 * Returns brands available in the portfolio selector.
 * @returns {Promise<Array<Object>>} Brands in display order.
 */
export async function getBrands() {
  return brands;
}

/**
 * Returns a brand by URL slug, or null when it does not exist.
 * @param {string} brandSlug URL slug.
 * @returns {Promise<Object|null>} Matching brand.
 */
export async function getBrandBySlug(brandSlug) {
  return brands.find((brand) => brand.slug === brandSlug) ?? null;
}
