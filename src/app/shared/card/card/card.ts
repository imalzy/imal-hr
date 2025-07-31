import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardEmployee {
  @Input() employee!: {
    id: number;
    avatar: string;
    name: string;
    status: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    location: string;
  };

  viewDetails() {
    // emit or route to details
    console.log('View details:', this.employee.id);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'status-online';
      case 'inactive':
        return 'status-inactive';
      case 'busy':
        return 'status-busy';
      case 'away':
        return 'status-away';
      case 'offline':
        return 'status-offline';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'inactive':
        return 'Tidak Aktif';
      case 'busy':
        return 'Sibuk';
      case 'away':
        return 'Away';
      case 'offline':
        return 'Cuti';
      default:
        return '';
    }
  }

  getNameAvatar(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }
}
