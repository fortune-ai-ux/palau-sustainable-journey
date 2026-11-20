import { NavLink, Routes, Route } from 'react-router-dom';
export default function App(){return <><header><NavLink to="/">PALAU · 帛琉南島永續實踐計畫</NavLink></header><main><Routes><Route path="*" element={<h1>探索海洋、走進文化、實踐永續</h1>}/></Routes></main></>}
