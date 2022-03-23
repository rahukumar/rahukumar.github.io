import { AutoCompleteModule } from './auto-complete.module';

describe('AutoCompleteModule', () => {
  let autoCompleteModule: AutoCompleteModule;

  beforeEach(() => {
    autoCompleteModule = new AutoCompleteModule();
  });

  it('should create an instance', () => {
    expect(autoCompleteModule).toBeTruthy();
  });
});
