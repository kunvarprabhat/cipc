import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-gallary',
  imports: [CommonModule],
  templateUrl: './gallary.html',
  styleUrl: './gallary.css'
})

export class Gallary implements OnInit {
  // All available images from public/Assets folder
  // Images are now in public folder for Angular's new build system
  images: { url: string, alt: string, name: string }[] = [
    { url: 'Assets/images/a.jpeg', alt: 'CIPC Gallery Image 1', name: 'Celebration Event' },
    { url: 'Assets/images/b.jpeg', alt: 'CIPC Gallery Image 2', name: 'Laboratory Research' },
    { url: 'Assets/images/c.jpeg', alt: 'CIPC Gallery Image 3', name: 'Festive Gathering' },
    { url: 'Assets/images/d.jpeg', alt: 'CIPC Gallery Image 4', name: 'Classroom Learning' },
    { url: 'Assets/images/e.jpeg', alt: 'CIPC Gallery Image 5', name: 'Cultural Event' },
    { url: 'Assets/images/f.jpeg', alt: 'CIPC Gallery Image 6', name: 'Outdoor Education' },
    { url: 'Assets/images/g.jpeg', alt: 'CIPC Gallery Image 7', name: 'Academic Session' },
    { url: 'Assets/images/h.jpeg', alt: 'CIPC Gallery Image 8', name: 'Lab Practical' },
    { url: 'Assets/images/i.jpeg', alt: 'CIPC Gallery Image 9', name: 'Student Activities' },
    { url: 'Assets/images/j.jpeg', alt: 'CIPC Gallery Image 10', name: 'Campus Life' },
    { url: 'Assets/images/k.jpeg', alt: 'CIPC Gallery Image 11', name: 'Medical Training' },
    { url: 'Assets/images/l.jpeg', alt: 'CIPC Gallery Image 12', name: 'Workshop Session' },
    { url: 'Assets/images/m.jpeg', alt: 'CIPC Gallery Image 13', name: 'Group Photo' },
    { url: 'Assets/images/n.jpeg', alt: 'CIPC Gallery Image 14', name: 'Field Trip' },
    { url: 'Assets/images/o.jpeg', alt: 'CIPC Gallery Image 15', name: 'Award Ceremony' },
    { url: 'Assets/images/p.jpeg', alt: 'CIPC Gallery Image 16', name: 'Historical Visit' },
  ];

  // Lightbox Controls
  lightboxOpen = false;
  currentIndex = 0;
  imageLoading = false;

  constructor() {}

  ngOnInit(): void {}

  // Keyboard navigation for lightbox
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.lightboxOpen) {
      if (event.key === 'Escape') {
        this.closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'ArrowRight') {
        this.nextImage();
      }
    }
  }

  openLightbox(index: number) {
    this.currentIndex = index;
    this.lightboxOpen = true;
    this.imageLoading = true;
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    // Reset loading after a short delay
    setTimeout(() => {
      this.imageLoading = false;
    }, 300);
  }

  closeLightbox() {
    this.lightboxOpen = false;
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  nextImage() {
    this.imageLoading = true;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    setTimeout(() => {
      this.imageLoading = false;
    }, 200);
  }

  prevImage() {
    this.imageLoading = true;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    setTimeout(() => {
      this.imageLoading = false;
    }, 200);
  }

  goToImage(index: number) {
    this.imageLoading = true;
    this.currentIndex = index;
    setTimeout(() => {
      this.imageLoading = false;
    }, 200);
  }

  onImageError(event: any) {
    console.error('Image failed to load:', event.target.src);
    // Try alternative path with leading slash
    const img = event.target as HTMLImageElement;
    const currentSrc = img.src;
    const baseUrl = window.location.origin;
    
    if (currentSrc.includes('Assets/')) {
      // Try with leading slash
      const path = currentSrc.replace(baseUrl, '');
      img.src = path.startsWith('/') ? path : '/' + path;
    } else if (!currentSrc.includes('/Assets/')) {
      // Try adding leading slash
      const path = '/Assets' + currentSrc.split('Assets')[1];
      img.src = path;
    }
  }
}
