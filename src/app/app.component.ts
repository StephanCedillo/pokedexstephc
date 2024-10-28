import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokedexViewComponent } from './Components/pokedex-view/pokedex-view.component';
import { GraficoComponent } from './Components/grafico/grafico.component';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
     PokedexViewComponent,
     GraficoComponent,
     FormsModule,
    IonicModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
}
