export async function getBrands() {
  const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
  if (!response.ok) throw new Error('Failed to fetch brands');
  return response.json();
}

export async function getModels(brandCode: string) {
  const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos`);
  if (!response.ok) throw new Error('Failed to fetch models');
  return response.json();
} 