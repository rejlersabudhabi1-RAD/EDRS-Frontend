import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home1 from '../pages/Home1';
import Home2 from '../pages/Home2';
import About from '../pages/About';
import Service from '../pages/Service';
import Service2 from '../pages/Service2';
import ServiceDetails from '../pages/ServiceDetails';
import Project from '../pages/Project';
import ProjectDetails from '../pages/ProjectDetails';

import Contact from '../pages/Contact';
import Error404 from '../pages/Error404';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Dashboard from './Dashboard';
import SuperAdminDashboard from './SuperAdminDashboard';
import ModernDashboard from './ModernDashboard';
import ProtectedRoute from './ProtectedRoute';
import APITest from './APITest';
import LandingPage from './LandingPage';
import EdrsDashboard from './edrs/EdrsDashboard';
import PdfToPidModule from './edrs/PdfToPidModule';
import DocumentValidationModule from './edrs/DocumentValidationModule';
import DocumentUploadModule from './edrs/DocumentUploadModuleSimple';
import AIDashboard from './AIDashboard';

import AIProcessingModule from './edrs/AIProcessingModule';
import ProjectManagementModule from './edrs/ProjectManagementModule';

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />}></Route>
                <Route path="/home" element={<Home1 />}></Route>
                <Route path="/home-2" element={<Home2 />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/service" element={<Service />}></Route>
                <Route path="/service-2" element={<Service2 />}></Route>
                <Route path="/service-details" element={<ServiceDetails />}></Route>
                <Route path="/project" element={<Project />}></Route>
                <Route path="/project-details" element={<ProjectDetails />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                
                {/* Authentication Routes */}
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path="/register" element={<RegisterForm />}></Route>
                <Route path="/api-test" element={<APITest />}></Route>
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <ModernDashboard />
                    </ProtectedRoute>
                }></Route>
                
                {/* Super Admin Routes - AI-Powered Management */}
                <Route path="/ai-erp/admin-dashboard" element={
                    <ProtectedRoute requiredRole="SA">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }></Route>
                
                {/* Enhanced Super Admin Control Center Routes */}
                <Route path="/admin-panel" element={
                    <ProtectedRoute requiredRole="super_admin">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }></Route>
                <Route path="/admin-panel/users" element={
                    <ProtectedRoute requiredRole="super_admin">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }></Route>
                <Route path="/admin-panel/activity" element={
                    <ProtectedRoute requiredRole="super_admin">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }></Route>
                <Route path="/admin-panel/analytics" element={
                    <ProtectedRoute requiredRole="super_admin">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }></Route>
                <Route path="/admin-panel/security" element={
                    <ProtectedRoute requiredRole="super_admin">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }></Route>
                <Route path="/admin-panel/resources" element={
                    <ProtectedRoute requiredRole="super_admin">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }></Route>
                <Route path="/admin-panel/projects" element={
                    <ProtectedRoute requiredRole="super_admin">
                        <SuperAdminDashboard />
                    </ProtectedRoute>
                }></Route>
                
                {/* Engineer Routes */}
                <Route path="/ai-erp/engineer-dashboard" element={
                    <ProtectedRoute requiredRole="ENGINEER">
                        <Dashboard />
                    </ProtectedRoute>
                }></Route>
                
                {/* Project Manager Routes */}
                <Route path="/ai-erp/pm-dashboard" element={
                    <ProtectedRoute requiredRole="PM">
                        <Dashboard />
                    </ProtectedRoute>
                }></Route>
                
                {/* EDRS Module Routes */}
                <Route path="/edrs/dashboard" element={
                    <ProtectedRoute>
                        <EdrsDashboard />
                    </ProtectedRoute>
                }></Route>
                <Route path="/edrs/pdf-to-pid" element={
                    <ProtectedRoute>
                        <PdfToPidModule />
                    </ProtectedRoute>
                }></Route>
                <Route path="/edrs/document-validation" element={
                    <ProtectedRoute>
                        <DocumentValidationModule />
                    </ProtectedRoute>
                }></Route>
                <Route path="/edrs/document-upload" element={
                    <ProtectedRoute>
                        <DocumentUploadModule />
                    </ProtectedRoute>
                }></Route>
                
                {/* Direct Document Upload Route */}
                <Route path="/document-upload" element={
                    <ProtectedRoute>
                        <DocumentUploadModule />
                    </ProtectedRoute>
                }></Route>
                
                {/* Direct Document Validation Route */}
                <Route path="/document-validation" element={
                    <ProtectedRoute>
                        <DocumentValidationModule />
                    </ProtectedRoute>
                }></Route>
                
                {/* Direct PDF to P&ID Route */}
                <Route path="/pdf-to-pid" element={
                    <ProtectedRoute>
                        <PdfToPidModule />
                    </ProtectedRoute>
                }></Route>

                <Route path="/edrs/ai-processing" element={
                    <ProtectedRoute>
                        <AIProcessingModule />
                    </ProtectedRoute>
                }></Route>

                {/* AI Dashboard Route */}
                <Route path="/ai-dashboard" element={
                    <ProtectedRoute>
                        <AIDashboard />
                    </ProtectedRoute>
                }></Route>
                <Route path="/edrs/ai-dashboard" element={
                    <ProtectedRoute>
                        <AIDashboard />
                    </ProtectedRoute>
                }></Route>

                
                <Route path="*" element={<Error404 />}></Route>
            </Routes>
        </>
    );
};

export default Routers;