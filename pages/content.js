import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';


const MapWithNoSSR = dynamic(
  () => import('./Map'),
  { 
    ssr: false,
    loading: () => <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка карты...</div>
  }
);


const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '32px',
    margin: 0
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    textDecoration: 'none',
    borderRadius: '4px'
  },
  mapContainer: {
    height: '500px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '20px'
  },
  form: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd'
  },
  formTitle: {
    margin: '0 0 15px 0',
    fontSize: '18px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default function Stores() {
  const [stores, setStores] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [markerPosition, setMarkerPosition] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    address: '',
    phone: '',
    lat: 55.751244,
    lng: 37.618423
  });
  
  React.useEffect(() => {
    fetchStores();
  }, []);
  
  const fetchStores = async () => {
    try {
      const response = await fetch('/api/stores');
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };
  
  const handleMapClick = (lat, lng) => {
    setFormData(prev => ({
      ...prev,
      lat,
      lng
    }));
    setMarkerPosition([lat, lng]);
    setShowForm(true);
  };
  
  const handleStoreClick = (store) => {
    alert(`
       ${store.name}
       ${store.address}
       ${store.phone || 'Телефон не указан'}
    `);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Магазин добавлен!');
        setShowForm(false);
        setMarkerPosition(null);
        setFormData({ name: '', address: '', phone: '', lat: 55.751244, lng: 37.618423 });
        fetchStores();
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  
  return (
    <>
      <Head>
        <title>Зоомагазины на карте</title>
      </Head>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Зоомагазины на карте</h1>
          <a href="/" style={styles.backButton}>← На главную</a>
        </div>
        
        {/* Карта */}
        <div style={styles.mapContainer}>
          <MapWithNoSSR 
            stores={stores}
            markerPosition={markerPosition}
            onMapClick={handleMapClick}
            onStoreClick={handleStoreClick}
          />
        </div>
        
       
        {showForm && (
          <div style={styles.form}>
            <h3 style={styles.formTitle}>Добавить новый магазин</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Название магазина"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Адрес"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Телефон (необязательно)"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={styles.input}
              />
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.submitButton}>
                  Добавить
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={styles.cancelButton}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}