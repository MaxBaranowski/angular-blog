import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainLayoutComponent } from './blog/layout/main-layout.component';
import { HomePageComponent } from './blog/pages/home-page/home-page.component';
import { PostPageComponent } from './blog/pages/post-page/post-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'}, // slash points to HomepageComponent
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent}
    ]
  },
  // lazyloading for admin router [pathToFile#[nameOfClass]] for typescript or smth
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
