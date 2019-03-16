
contract Callee:
    def getBytes(key: bytes32) -> bytes32: constant
    def setBytes(key: bytes32, value: bytes32): modifying

calleeContract: public(Callee)

@public
def __init__(callee_address: address):
    self.calleeContract = Callee(callee_address)

@public
def storeBytes(key: bytes32, value: bytes32):
    self.calleeContract.setBytes(key, value)

@public
def getBytes(key: bytes32) -> bytes32:
    return self.calleeContract.getBytes(key)
