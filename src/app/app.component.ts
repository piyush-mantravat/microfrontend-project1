import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'project1';
  data: string= "";

  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  async project2ComponentMethodData(){
     // Load the ListComponent from project2
     const { ListComponent } = await loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      remoteName: 'project2',
      exposedModule: './ListComponent',
    });

    // Create an instance of the component and call the method
    const listComponent = new ListComponent();
    this.data = listComponent.getComponentData();
    console.log(this.data,"pkpkpkp");
  }

  homePageData(){
    this.project2ComponentMethodData();
    this.router.navigate(['/']); // Specify the route to navigate to
  }

  toDoListData(){
    this.data = "";
    this.router.navigate(['/todo-list']); // Specify the route to navigate to
  }
}
