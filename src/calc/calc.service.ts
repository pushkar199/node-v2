import { Injectable, BadRequestException } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto) {
    try {
      const result = this.evaluateExpression(calcBody.expression);
      return result;
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid expression provided',
        error: 'Bad Request',
      });
    }
  }

  private evaluateExpression(expression: string): number {
    const operators = ['+', '-', '*', '/'];
    const tokens = expression.split(/([\+\-\*\/])/).map(token => token.trim());

    let result = 0;
    let currentOperator = '+';
    let currentOperand = null;

    for (const token of tokens) {
      if (operators.includes(token)) {
        currentOperator = token;
      } else {
        const value = parseFloat(token);
        if (isNaN(value)) {
          throw new Error('Invalid token');
        }
        if (currentOperand === null) {
          currentOperand = value;
        } else {
          switch (currentOperator) {
            case '+':
              result += currentOperand;
              currentOperand = value;
              break;
            case '-':
              result += currentOperand;
              currentOperand = -value;
              break;
            case '*':
              currentOperand *= value;
              break;
            case '/':
              if (value === 0) {
                throw new Error('Division by zero');
              }
              currentOperand /= value;
              break;
            default:
              throw new Error('Invalid operator');
          }
        }
      }
    }

    if (currentOperand !== null) {
      result += currentOperand;
    } else {
      throw new Error('Invalid expression');
    }

    return result;
  }
}






