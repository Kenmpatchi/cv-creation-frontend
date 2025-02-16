import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CreationComponent } from './creation/creation.component';
import { CvCanadianComponent } from './cv-canadian/cv-canadian.component';
import { CvEuropienneComponent } from './cv-europienne/cv-europienne.component';
import { CrudComponent } from './crud/crud.component';
import { authGuard } from './server/auth.guard';


export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'',
        redirectTo:'/home',
         pathMatch:'full'
    },
    {
        path:'creation/:id',
        component:CreationComponent,
        canActivate:[authGuard]

    },
    {
        path:'canadian/:id',
        component:CvCanadianComponent,
        canActivate:[authGuard]
    },
    {
        path:'europienne/:id',
        component:CvEuropienneComponent,
        canActivate:[authGuard]
    },
    {
        path:'crud/:id',
        component:CrudComponent,
        canActivate:[authGuard]
    }
    
    
];
