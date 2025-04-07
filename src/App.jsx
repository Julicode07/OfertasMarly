import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { RequireAuth } from './RequireAuth';
import Loader from './components/Loader/Loader';
import AuthForm from './pages/Auth';

const NotFound = React.lazy(() => import('./pages/NotFound'));
const MainPage = React.lazy(() => import('./pages/MainPage'));
const ProductsPage = React.lazy(() => import('./pages/Products/Products'));
const ProductView = React.lazy(() => import('./pages/Products/ProductView'));
const CategoriesPage = React.lazy(() => import('./pages/Categories'));

const Admin = React.lazy(() => import('./pages/Admin/Admin'));
const AdminProducts = React.lazy(() => import('./pages/Admin/Products'));
const AddProducts = React.lazy(() => import('./pages/Admin/AddProduct'));
const EditProduct = React.lazy(() => import('./pages/Admin/EditProduct'));

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/auth"
          element={
            <Suspense fallback={<Loader bg="bg-white/80" text="text-gray-200" fill="fill-blue-500" />}>
              <AuthForm />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader bg="bg-white/80" text="text-gray-200" fill="fill-blue-500" />}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="/productos"
          element={
            <Suspense fallback={<Loader bg="bg-white/80" text="text-gray-200" fill="fill-blue-500" />}>
              <ProductsPage />
            </Suspense>
          }
        />
        <Route
          path="/producto/:id"
          element={
            <Suspense fallback={<Loader bg="bg-white/80" text="text-gray-200" fill="fill-blue-500" />}>
              <ProductView />
            </Suspense>
          }
        />
        <Route
          path="/categorias"
          element={
            <Suspense fallback={<Loader bg="bg-white/80" text="text-gray-200" fill="fill-blue-500" />}>
              <CategoriesPage />
            </Suspense>
          }
        />

        {/* Rutas protegidas de Admin */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Suspense fallback={<Loader bg="bg-zinc-950" text="text-zinc-900" fill="fill-zinc-400" />}>
                <Admin />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/products"
          element={
            <RequireAuth>
              <Suspense fallback={<Loader bg="bg-zinc-950" text="text-zinc-900" fill="fill-zinc-400" />}>
                <AdminProducts />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <RequireAuth>
              <Suspense fallback={<Loader bg="bg-zinc-950" text="text-zinc-900" fill="fill-zinc-400" />}>
                <AddProducts />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <RequireAuth>
              <Suspense fallback={<Loader bg="bg-zinc-950" text="text-zinc-900" fill="fill-zinc-400" />}>
                <EditProduct />
              </Suspense>
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
