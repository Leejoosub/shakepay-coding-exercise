import React from 'react';

export interface transaction {
  createdAt: string;
  amount: number;
  currency: string;
  type: string;
  direction: string;
  from?: object;
  to?: object;
}
