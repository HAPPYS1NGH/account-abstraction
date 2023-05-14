# Wallet with Account Abstraction Implementation

## Introduction

This documentation provides an overview and usage guide for a Git project that implements a wallet with Account Abstraction. The wallet utilizes a separate Mempool for transactions and employs user operations in the form of transactions, which are picked up by a bundler. The bundled transactions are then sent to the Entry Point contract on the Mumbai network. The wallet follows the Factory model provided by the Ethereum Foundation.

## Installation

To use this wallet project, follow the steps below:

1. Clone the Git repository to your local machine:

   ```bash
   git clone https://github.com/HAPPYS1NGH/account-abstraction
   ```

2. Install the required dependencies using npm (Node Package Manager):

   ```bash
   cd account-abstraction
   npm install
   ```

## Configuration

The wallet project provides configuration options to customize the behavior. Modify the configuration file located at `components/NormalAccount.jsx` in `config` state to make the desired changes.

### Bundler Configuration

The bundler is provided by StackUp and allows for efficient transaction bundling.

### EntryPoint

The default value is set to `0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789`. This address points to the singleton Entry Point contract and remains the same across all networks.

### Simple Account Factory

The Simple Account Factory is used to create simple accounts based on the Factory model. The configuration options for the Simple Account Factory are as follows:

- `simpleAccountFactory`: The default value is set to `0x9406Cc6185a346906296840746125a0E44976454`.

## Conclusion

This documentation provides an overview of the Git project that implements a wallet with Account Abstraction. It explains the project's structure, installation process, configuration options, and basic usage instructions. By following this guide, you can easily set up and utilize the wallet project in your Ethereum development endeavors.
