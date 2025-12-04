interface KeyAuthConfig {
  name: string;
  ownerid: string;
  version: string;
}

interface KeyAuthResponse {
  success: boolean;
  message: string;
  info?: {
    username: string;
    subscriptions: string[];
    expiry: string;
  };
}

class KeyAuth {
  private name: string;
  private ownerid: string;
  private version: string;
  private sessionid: string = '';
  private initialized: boolean = false;

  constructor(config: KeyAuthConfig) {
    this.name = config.name;
    this.ownerid = config.ownerid;
    this.version = config.version;
  }

  async init(): Promise<boolean> {
    try {
      const response = await fetch('https://keyauth.win/api/1.2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'init',
          name: this.name,
          ownerid: this.ownerid,
          ver: this.version,
        }),
      });

      const data: KeyAuthResponse = await response.json();

      if (data.success) {
        this.initialized = true;
        this.sessionid = (data as any).sessionid || '';
        return true;
      }

      return false;
    } catch (error) {
      console.error('KeyAuth initialization error:', error);
      return false;
    }
  }

  async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
    if (!this.initialized) {
      await this.init();
    }

    try {
      const response = await fetch('https://keyauth.win/api/1.2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'login',
          username: username,
          pass: password,
          sessionid: this.sessionid,
          name: this.name,
          ownerid: this.ownerid,
        }),
      });

      const data: KeyAuthResponse = await response.json();

      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Connection error. Please try again.',
      };
    }
  }

  async license(key: string): Promise<{ success: boolean; message: string }> {
    if (!this.initialized) {
      await this.init();
    }

    try {
      const response = await fetch('https://keyauth.win/api/1.2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'license',
          key: key,
          sessionid: this.sessionid,
          name: this.name,
          ownerid: this.ownerid,
        }),
      });

      const data: KeyAuthResponse = await response.json();

      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Connection error. Please try again.',
      };
    }
  }

  async upgrade(username: string, key: string): Promise<{ success: boolean; message: string }> {
    if (!this.initialized) {
      await this.init();
    }

    try {
      const response = await fetch('https://keyauth.win/api/1.2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'upgrade',
          username: username,
          key: key,
          sessionid: this.sessionid,
          name: this.name,
          ownerid: this.ownerid,
        }),
      });

      const data: KeyAuthResponse = await response.json();

      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Connection error. Please try again.',
      };
    }
  }
}

export const keyAuthApp = new KeyAuth({
  name: 'matchgen',
  ownerid: 'FYkAfUvtKZ',
  version: '1.0',
});
