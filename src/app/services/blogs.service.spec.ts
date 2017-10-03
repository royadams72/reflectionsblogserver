import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BlogsService } from './blogs.service';

describe('BlogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogsService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([BlogsService], (service: BlogsService) => {
    expect(service).toBeTruthy();
  }));
});
