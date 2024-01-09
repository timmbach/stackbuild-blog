import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full',
  },

  {
    path: 'blog',
    component: BlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
