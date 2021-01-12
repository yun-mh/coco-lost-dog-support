# Coco Lost Dog Support

"Coco Lost Dog Support", which is the subsystem of 'Coco for dogs', is aiming for supporting dog owners who is finding their lost dogs.

Read this in other languages: [日本語](./README.md), [English](./README.en.md), [한국어](./README.ko.md)

<em>※ This system is a subsystem of Coco application, so you can access through Web or Mobile version of Coco application.</em>

## Technologies

This project is created with:

- React: 17.0.1
- Apollo Client: 3.2.5
- tailwindcss: 1.9.6

## Screenshots

| <img src="https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/readme/support_main.png" alt="drawing" width="300"/> | <img src="https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/readme/support_modal.png" alt="drawing" width="300"/> |
| :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
|                                                         Main                                                         |                                                         Modal                                                         |

## Features

Coco Lost Dog support provides features like below.

### Creating Lost Dog Information Thread

Users can register information of their lost dogs.\
Also they can upload more details like pictures of their dogs, age, the place where and where they were lost, and so on, which can be some clues to find them.\
For creating threads, users should access this system through the website or mobile applications of Coco.

### Modifying threads

Users can modify the thread they created before.\
As same with creating, they should access this system through the website or mobile applications of Coco.

### Setting dogs found

Users can close the threads if lost dogs come back to their home.\
All the detailed information will be private once users close the threads.\
As same with creating, they should access this system through the website or mobile applications of Coco.

### Report

People who find lost dogs can report information, like their phone number or the place where and when they find the dog and so on, to the dog owner.\
They can access this system by scanning the QR code which is attached to dog's harness or lead.\
Dog owners can receive push notifications whenever new reports are uploaded, if they are using the mobile application of Coco.

### Modifying reports

People who have uploaded reports before can modify them by password authentication.\
Dog owners can receive push notifications whenever reports are updated, if they are using the mobile application of Coco.
