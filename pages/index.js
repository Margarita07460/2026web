import React from 'react';
import Head from 'next/head';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Главная страница</title>
      </Head>
      <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '30px' }}>Лабораторная работа №1</h1>
        
        <p style={{ fontSize: '24px', margin: '15px 0' }}>
          <strong>Студентки:</strong>
        </p>
        <p style={{ fontSize: '24px', margin: '5px 0 5px 30px'}}>
          Бондарь К.В.
        </p>
        <p style={{ fontSize: '24px', margin: '5px 0 15px 30px'}}>
          Воробьева М.М.
        </p>
        <p style={{ fontSize: '24px', margin: '15px 0' }}>
          <strong>Группа:</strong> 22ВВП1
        </p>
        
        <hr style={{ margin: '30px 0' }} />
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          marginTop: '0px'
        }}>
          
          
          <AwesomeSlider
            style={{
              width: '800px',
              height: '600px'
            }}
          >
            <div data-src="https://s0.rbk.ru/v6_top_pics/media/img/8/07/756634034894078.jpg" />
            <div data-src="https://i.pinimg.com/originals/31/9e/c5/319ec524a74c2b2692fe00b7ec5c1d7a.jpg" />
          </AwesomeSlider>
          
          
          <div style={{ 
            width: '100%',
            textAlign: 'center',
            marginTop: '50px'  
          }}>
            <a 
              href="/content" 
              style={{ 
                fontSize: '18px', 
                color: 'white',
                backgroundColor: '#667eea',
                padding: '12px 30px',
                textDecoration: 'none',
                borderRadius: '25px',
                display: 'inline-block',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              Посмотреть карту
            </a>
          </div>
        </div>
      </div>
    </>
  );
}