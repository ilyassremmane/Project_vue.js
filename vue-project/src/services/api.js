export async function getInstrumentsData(limit = 20) {
  try {
    const searchRes = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=18&hasImages=true&q=instrument');
    const searchData = await searchRes.json();
    
    const shuffledIDs = searchData.objectIDs.sort(() => 0.5 - Math.random()).slice(0, limit);
    
    const promises = shuffledIDs.map(id => 
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        .then(res => res.json())
    );
    
    const instruments = await Promise.all(promises);
    
    return instruments.map(obj => ({
      id: obj.objectID,
      name: obj.title,
      year: obj.objectBeginDate,
      family: obj.classification || 'Inconnue',
      country: obj.country || 'Inconnu',
      pictureUrl: obj.primaryImageSmall || obj.primaryImage
    }));

  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
}